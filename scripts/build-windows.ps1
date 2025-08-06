$base_url = "https://dl.cryptlex.com/downloads"
$lexfloatclient_version ="v4.12.0"

New-Item -Path ".\tmp\windows" -ItemType Directory
$url = "$base_url/$lexfloatclient_version/LexFloatClient-Win.zip"
Write-Host "Downloading LexFloatClient library ..."
Write-Host $url
$output = ".\tmp\windows\LexFloatClient-Win.zip"
(New-Object System.Net.WebClient).DownloadFile($url, $output)

Expand-Archive $output -DestinationPath ".\tmp\windows\LexFloatClient-Win"

Copy-Item -Path ".\tmp\windows\LexFloatClient-Win\libs\vc14\x64\LexFloatClient.lib" -Destination ".\"
npm i
node-gyp rebuild

Copy-Item -Path ".\build\Release\lexfloatclient.node" -Destination ".\lib\bindings\windows\x64\lexfloatclient.node"
Copy-Item -Path ".\tmp\windows\LexFloatClient-Win\libs\vc14\x64\LexFloatClient.dll" -Destination ".\lib\bindings\windows\x64\LexFloatClient.dll"

Copy-Item -Path ".\tmp\windows\LexFloatClient-Win\libs\vc14\x86\LexFloatClient.lib" -Destination ".\"
npm i
node-gyp rebuild --arch=ia32

Copy-Item -Path ".\build\Release\lexfloatclient.node" -Destination ".\lib\bindings\windows\x32\lexfloatclient.node"
Copy-Item -Path ".\tmp\windows\LexFloatClient-Win\libs\vc14\x86\LexFloatClient.dll" -Destination ".\lib\bindings\windows\x32\LexFloatClient.dll"

