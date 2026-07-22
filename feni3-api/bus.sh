#!/bin/bash

curl -s --data-urlencode name_dm="Ilse" --data-urlencode limit=20 --data-urlencode timeOffset=0 --data "language=de&type_dm=stop&mode=direct&dmLineSelectionAll=1&depType=STOPEVENTS&includeCompleteStopSeq=0&useRealtime=1&outputFormat=json" https://efa.mvv-muenchen.de/ng/XSLT_DM_REQUEST \
|  jq -r '.["departureList"][] | [.["countdown"], .["dateTime"]["year"], .["dateTime"]["month"], .["dateTime"]["day"], .["dateTime"]["hour"], .["dateTime"]["minute"], .["realDateTime"]["yar"], .["realDateTime"]["month"], .["realDateTime"]["day"], .["realDateTime"]["hour"], .["realDateTime"]["minute"], .["servingLine"]["number"], .["servingLine"]["direction"]] | @tsv' \
|  gawk -F'\t' -v timeoffset="0" '$7==""{ printf("%02d:%02d %s %s in %d min\n", $5, $6, $12, $13, $1+timeoffset) }; $7!=""{ x=(mktime($7" "$8" "$9" "$10" "$11" 00")-mktime($2" "$3" "$4" "$5" "$6" 00"))/60; if(x == 0) printf("%02d:%02d %s %s in %d min\n", $5, $6, $12, $13, $1+timeoffset); else printf("%02d:%02d(+%d) %s %s in %d min\n", $5, $6, x, $12, $13, $1+timeoffset) }' \
| grep "157"| head -n 5
