# ParallelOPM

* 1.Collect all the log files for a particular Level in a Folder. Save the folder in "ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA"

* Copy the path of this folder with log files. 
    * Replace the "LOGS" variable in "ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE/getBoardID.py" with the copied path

    * Replace the "log_files" variable in "ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE/GlyphBoardState_2.py" with the copied path
      
    * Replace the variable "level" in  "ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE/GlyphBoardState_2.py" to the level you are interested in. (Currently supports Level 5 and 7)
    
    * Replace the Variable "LOG" in "ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE/player_statistics.py", with the copied path.

* Run the script "ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA/
screenshot_dict.py", in the command prompt and copy the command line output and paste it in the "node_image_mapper" variable in "ParallelOPM-main/CODE/GLYPH/Archive/glyph/app.js".

* Run the script "ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE/
player_statistics.py", in the command prompt and copy the command line output and paste it in the "playerStatisticsData" variable in "ParallelOPM-main/CODE/GLYPH/Archive/glyph/app.js".

* Run the file "ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE/
dict_maker.py" and copy the command prompt output and paste it in the USERMAP variable in "ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE/BuildNewGlyph.py".

* Ensure that you have an empty "Screenshots", folder in "ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA" folder

* Open the command prompt and run the python file "ParallelOPM-main/CODE/GLYPH/Archive/Sai/CODE/GlyphBoardState_2.py", after that you should be able to see the "ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA/Screenshots" folder full with all the screenshots. In  "ParallelOPM-main/CODE/GLYPH/Archive/glyph/data" you should find "level_{the level number}_sai.json"

* After running the abstraction make sure to copy the "ParallelOPM-main/CODE/GLYPH/Archive/Sai/DATA/Screenshots" folder to "ParallelOPM-main/CODE/GLYPH/Archive/glyph/Screenshots" folder

* Navigate to "ParallelOPM-main/CODE/GLYPH/Archive/glyph/" folder and run command prompt and run the command "python -m http.server".







