# ParallelOPM

* This repository contains Code segments for Abstraction and drawing a connection between Glyph and the game Parallel.

* There are two modes you can use this repository (a) With Screenshots and GIFs (b) Without Screenshots and GIFs

### With Screenshots and GIFs and Glyph

* Navigate to "/ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE"

* Edit Line Number 24,25 with the correct directory of the Log Files and Level of the Game in all_state_screenshots.py

* Edit Line Number 8 of  with the correct directory of the Log files in snapshot_status.py

* Navigate to  "/ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA" and empty folders in directories GIFs, IntermediateScreenshots,Screenshots.

* Navigate to "/ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE"

* Run dict_maker.py. Copy the terminal output and replace the USERMAP variable with the copied output.

* Run python all_state_screenshots.py

* In the current directory you will see output files trace.json, stats.json, stats_2.json.

* Copy content in trace.json and update the *player_traces* variable in "ParallelOPM-main/CODE/GLYPH/Archive/glyph/app.js"

* Copy content in stats.json and update the *playerStatisticsData* variable in "ParallelOPM-main/CODE/GLYPH/Archive/glyph/app.js"

* Copy content in stats.json and update the *playerEventStatisticsData* variable in "ParallelOPM-main/CODE/GLYPH/Archive/glyph/app.js"

* Run "/ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA/gif_dict.py". Copy the terminal output and repace the *gif_mapper* in app.js with the copied output.

* Run "/ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA/screenshot_dict.py". Copy the terminal output and repace the *node_image_mapper* in app.js with the copied output.

* Copy Screenshots, IntermediateScreenshots, GIFs from "/ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA" to "ParallelOPM-main/CODE/GLYPH/Archive/glyph"

* From "ParallelOPM-main/CODE/GLYPH/Archive/glyph" run *python -m http.server*


### Without Screenshots and GIFs

* Navigate to "/ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE"

* Edit Line Number 24,25 with the correct directory of the Log Files and Level of the Game in backend_style.py

* Edit Line Number 8 of  with the correct directory of the Log files in snapshot_status.py

* Run backend_style.py








