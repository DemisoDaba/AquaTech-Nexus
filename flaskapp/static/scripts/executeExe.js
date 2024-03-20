<button onclick="executeExe()">Run Data Analyzer</button>

<script>
function executeExe() {
    // Assuming DataAnalyzer.exe is in the same directory as the HTML file
    var pathToExe = 'DataAnalyzer.exe';
    var shell = new ActiveXObject("WScript.Shell");
    shell.run(pathToExe);
}
</script>
