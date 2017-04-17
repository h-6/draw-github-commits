#!/usr/bin/perl -w
use strict;

my $current = @ARGV==0;
my $year_begin;

if ($current) {
	my $last_sunday = `date -d '12:00:00Z Last Sunday'`;
	$year_begin = `date -d "$last_sunday-52 weeks"`;
} else {
	my $year = "$ARGV[0]";
	# To do: Validation
	my $new_years = `date -d '$year-01-01 12:00:00Z'`;
	my $day_of_week = `date -d '$year-01-01' +%u`;
	$year_begin = `date -d "$new_years-$day_of_week days"`;
}

my @lines = <STDIN>;

for my $day (0..6) {
	my $line = $lines[$day];
	my @characters = split '', $line;
	for my $week (0..51) {
		my $commits = $characters[$week];
		my $date = `date -d "$year_begin+$week weeks+$day days"`;
		print `git commit --allow-empty --date='$date' --allow-empty-message -m ''` for (1..$commits);
	}
}
