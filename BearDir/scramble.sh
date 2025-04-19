#!/bin/bash
#to be added to Cron
wordlist="common.txt"
prev=$(find . -type d -maxdepth 1)
prev=$(echo $prev | cut -d' ' -f2)
echo $prev
if [ ! -f "$wordlist" ]; then
    echo "$wordlist file not found!"
    exit 1
fi

rand=$((RANDOM % 1942))
word=$(sed "${rand}q;d" "$wordlist")
echo $word
mkdir ./$word
cp "$prev/flag.php" "./$word"
rm -rf $prev
#get env variables
source .env
oldpass=$PASS
echo "oldpass: $oldpass"
#change the database password to the one you want through an sql command
#echo "UPDATE users SET password = '$word' WHERE username = 'root';" | mysql -u root@localhost -p'
