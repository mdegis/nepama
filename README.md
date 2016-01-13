# Nerdish Password Manager a.k.a nepama

<p align="center">
  <img src="http://i.giphy.com/Cz6TlrRVVyv9S.gif" alt="nerd"/>
</p>

Local password manager that stores your fateful information (specially ones cannot be saved into your favorite browser... if you know what I mean).

## Installation

It's node. Really simple... npm install and stuff you've already know (Don't do it somewhere you don't have permission to write ofc). You can run it with node app.js or compile it with nexe. For easy execution add it to your path environment.

## Usage
````
nepama get -n nameOfYourInfo
nepama create -n nameOfYourInfo -u username -p password
nepama reset
````

## Is it safe?

It does not upload anything to the cloud and uses AES. So yeah, it's pretty safe.

> Brute forcing a 128 bit key using this device would take 1,315,888,179,366,587 (1.3 quadrillion) years. That’s the same as 1,315,888 billion years. Current scientific models predict the universe to be 13 billion years old. The times required to brute force 192 and 256 bit keys are astronomically larger.
