# Video für flüssiges Scroll-Scrubbing neu encodieren
# Jeder Frame wird zum Keyframe (-g 1) = sofortiges Seeking ohne Ruckeln
# FFmpeg muss installiert sein: https://ffmpeg.org/
# Nach dem Re-Encode: hero-video-optimized.mp4 in hero-video.mp4 umbenennen

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$inputFile = Join-Path $projectDir "public/hero-video.mp4"
$outputFile = Join-Path $projectDir "public/hero-video-optimized.mp4"

if (-not (Test-Path $inputFile)) {
    Write-Host "Fehler: $inputFile nicht gefunden"
    exit 1
}

ffmpeg -i $inputFile -g 1 -an -c:v libx264 -crf 18 -preset slow -movflags +faststart $outputFile

if ($LASTEXITCODE -eq 0) {
    Write-Host "Fertig. Ersetze jetzt die alte Datei:"
    Write-Host "  Copy-Item '$outputFile' '$inputFile' -Force"
}
