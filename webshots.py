#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Create Web page with common browser resolutions for given URL and save them as
# PNG files in current working directory.
#
# Requires PhantomJS: http://phantomjs.org/
# Written by Ramiro Gómez http://ramiro.org/
# MIT licensed: http://rg.mit-license.org/

import argparse, os
from subprocess import call


def webshot(url, width, height, output_dir):
	width = str(width)
	height = str(height)
	output_dir = str(output_dir)

	phantomscript = os.path.join(os.path.dirname(__file__), 'webshots.js')
	call(['phantomjs', phantomscript, url, width, height, output_dir])

if __name__ == '__main__':
	# common screen resolutions from gs.statcounter.com
	resolutions = [
	    [1440, 900], [1366, 768], [1280, 1024], [1280, 800], [1024, 768], # web
	    [800, 600], [480, 800], [360, 640], [320, 480], [240, 320] # mobile
	]

	parser = argparse.ArgumentParser(description='webshots - create Web page screenshots')
	parser.add_argument('url')
	parser.add_argument('--width', help='The width of the screenshots in pixels')
	parser.add_argument('--height', help='The height of the screenshots in pixels')
	parser.add_argument('--output', help='Output images to the given directory', default=os.path.dirname(__file__))

	args = parser.parse_args()
	if args.width and args.height:
	    webshot(args.url, args.width, args.height, args.output)
	else:
	    for r in resolutions:
	    	webshot(args.url, r[0], r[1], args.output)
