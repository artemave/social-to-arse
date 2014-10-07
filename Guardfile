# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard :shell do
  watch /contentscript.js|style.css|popup.html/ do
    `open -g http://reload.extensions`
  end
end
