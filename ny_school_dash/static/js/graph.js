queue()
    .defer(d3.json, "/dashboard/data")
    .await(makeGraphs);

function makeGraphs(error, dashboard_data) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    // Donor data reformat date
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");

    dashboard_data.forEach(function (d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
        d.Year = d["date_posted"].getFullYear();
    });

    //For Graphical data instances

    //var topology = topojson.topology({foo: geojson});

    //Create Crossfilter Instance
    var ndx = crossfilter(dashboard_data);


    // Defining Dimensions
    var stateDim = ndx.dimension(function (d) {
        return d["school_state"];
    });
    var dateDim = ndx.dimension(function (d) {
        return d["date_posted"];
    });
    var metroDim = ndx.dimension(function (d) {
        return d["school_metro"];
    });
    var districtDim = ndx.dimension(function (d) {
        return d["school_district"];
    });
    var primaryFocDim = ndx.dimension(function (d) {
        return d["primary_focus_area"];
    });

    var resourceTypeDim = ndx.dimension(function (d) {
        return d["resource_type"];
    });
    var povertyDim = ndx.dimension(function (d) {
        return d["poverty_level"];
    });

    var yearDim = ndx.dimension(function (d) {
        return +d.Year;
    });
    var countyDim = ndx.dimension(function (d) {
        return d["school_county"]
    });

    var year_total = yearDim.group().reduceSum(function(d) {
        return d["total_donations"];
    });

    // Groupings
    var numProjectsByDate = dateDim.group();
    var nyResources = resourceTypeDim.group();
    var projectsByMetro = metroDim.group();
    var projectsByFocusArea = primaryFocDim.group();
    var poverty_total = povertyDim.group();
    var ny_counties = countyDim.group();
    var ny_districts = districtDim.group();
    var all = ndx.groupAll();
    var totalDonations = ndx.groupAll().reduceSum(function (d) {
        return d["total_donations"]
    });

    //Date variables
    var minDate = dateDim.bottom(1)[0]["date_posted"];
    var maxDate = dateDim.top(1)[0]["date_posted"];

    // Chart variables
    var nyTimeChart = dc.lineChart("#time-chart");
    var metroTypeChart = dc.rowChart("#metro-type-row-chart");
    var subjectChart = dc.rowChart("#subject-area-row-chart");
    var yearChart = dc.pieChart('#year-selector');
    var povertyChart = dc.pieChart("#poverty-level-pie-chart");
    var countySelectField = dc.selectMenu('#county-menu-select');
    var districtSelectField = dc.selectMenu('#district-menu-select');
    var totalDonationsDisplay = dc.numberDisplay('#total-donations');
    var totalDonationsUSDDisplay = dc.numberDisplay('#usd-donations');

    // Chart attributes and properties
    nyTimeChart
        .ordinalColors(["#00B2EE", "#F5DD14"])
        .height(300)
        .width(911)
        .margins({top:20, right:20, bottom:30, left:40})
        .dimension(dateDim)
        .group(numProjectsByDate, "Total New York Donations")
        .renderArea(true)
        .brushOn(false)
        .transitionDuration(500)
        .clipPadding(5)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticX(true)
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxisLabel("Number of Donations")
        .yAxis().ticks(6);


    yearChart
        .ordinalColors(['#3399ff', '#66ccff', '#ccffff', '#ffff99', '#ffff66', '#ffff00'])
        .height(300)
        .width(400)
        .dimension(yearDim)
        .group(year_total);

    povertyChart
        .height(300)
        .width(400)
        .dimension(povertyDim)
        .group(poverty_total)
        .legend(dc.legend())
        .renderTitle(false)
        .renderLabel(false);

    countySelectField
        .dimension(countyDim)
        .group(ny_counties);

    districtSelectField
        .dimension(districtDim)
        .group(ny_districts);

    totalDonationsDisplay
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);

    totalDonationsUSDDisplay
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalDonations)
        .formatNumber(d3.format(".3s"));

    metroTypeChart
        .dimension(metroDim)
        .group(projectsByMetro)
        .width(700)
        .height(300)
        .elasticX(true)
        .title(function (d) {
            return d.value;
        });


    subjectChart
        .dimension(primaryFocDim)
        .group(projectsByFocusArea)
        .width(700)
        .height(300)
        .elasticX(true)
        .xAxis().ticks(5);

    dc.renderAll();
}
