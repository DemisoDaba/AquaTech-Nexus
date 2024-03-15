$(document).ready(function () {
    // Define tab_name variable or pass it as a parameter

    switch (tab_name) {
        case "dash":
            setActiveTab('#dashboard');
            // Initialize Chart.js after the content is loaded
            var ctx = document.getElementById('myChart').getContext('2d');

            const currentYear = new Date().getFullYear(); // Get the current year
            const xValues = [];
            const yValues = [];

            // Populate xValues with years from the current year to 10 years in the future
            for (let year = currentYear - 1; year <= currentYear + 10; year++) {
                xValues.push(year.toString());
                // Generate dynamic sales data using a sinusoidal function
                // This will create an up-down pattern for better visibility insight
                const sales = Math.sin((year - currentYear) * Math.PI / 2) * 200 + 500; // Adjust amplitude and offset as needed
                yValues.push(sales);
            }

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Book Sales',
                        backgroundColor: "rgba(63, 81, 181, 0.7)", // Dark blue color with opacity
                        data: yValues,
                    }]
                },
                options: {
                    tooltips: {
                        displayColors: true,
                        callbacks: {
                            mode: 'x',
                        },
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false,
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                            type: 'linear',
                        }]
                    },
                    responsive: true,
                    legend: { position: 'bottom' },
                }
            });
            break;
        case "MyBooks":
            setActiveTab('#dookShelf');
            break;
        case "Publish":
            setActiveTab('#publish');
            break;
        case "my_account":
            setActiveTab('#account');
            break;
    }

    $('#dashboard').click(function (event) {
        window.location.href = "/dashboard/dash";
        setActiveTab('#dashboard');
    });

    $('#dookShelf').click(function (event) {
        window.location.href = "/dashboard/MyBooks";
        setActiveTab('#dookShelf');
    });

    $('#publish').click(function (event) {
        window.location.href = "/dashboard/Publish";
        setActiveTab('#publish');
    });

    $('#account').click(function (event) {
        window.location.href = "/dashboard/my_account";
        setActiveTab('#account');
    });

    $("#new_password").on("input", function (event) {
        var new_pass = $("#new_password").val();
        if (!new_pass) {
            $("#old_password").prop('required', false);
        } else {
            $("#old_password").prop('required', true);
        }
    });

    function setActiveTab(tab) {
        $('.menu-item').each(function () {
            $(this).removeClass("active");
        });
        $(tab).addClass("active");
    }
});
