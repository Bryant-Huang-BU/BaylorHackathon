#!/bin/bash
#to be added to Cron
rand=$((RANDOM % 1942))
word=$(sha1sum <<< $rand | cut -c1-8)
prev=$(find . -type d -maxdepth 1)
prev=$(echo $prev | cut -d' ' -f2)
echo $prev
echo $word
mkdir ./$word
export FLAG="$word"
cp "$prev/flag.php" "./$word"
rm -rf $prev

