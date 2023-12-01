const shortcut = require("create-desktop-shortcuts")
export default async function handler(req,res){
    const shortcutsCreated = shortcut({
        windows: { filePath: 'C:\\path\\to\\executable.exe' },
        linux:   { filePath: '/home/path/to/executable'     },
        osx:     { filePath: '/home/path/to/executable'     }
      });
      
      if (shortcutsCreated) {
        console.log('Everything worked correctly!');
      } else {
        console.log('Could not create the icon or set its permissions (in Linux if "chmod" is set to true, or not set)');
      }
      res.status(200).json({text:"sadasd"})
}