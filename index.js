const fs = require('node:fs');
// fs = file system 



// create file :

// 1) appendFile() method : It is used to create a new file and add content to it. If the file already exists, it will append the content to the existing file.
// fs.appendFile(path, data, callback function)
// fs.appendFile("hello.txt", "Hello World!", (err) => {
//     if (err) throw err;      
//     console.log("File created successfully.")
// });
// Issue : If the file already exists, it will append the content to the existing file. So, if you run the above code multiple times, it will keep appending "Hello World!" to the file "hello.txt".

// 2) writeFile() method : It is used to create a new file and add content to it. If the file already exists, it will overwrite the existing file.
// fs.writeFile(path, data, callback function)  
// fs.writeFile("hello.txt", "Hello World!", (err) => {
//     if (err) throw err;      
//     console.log("File created successfully.")
// });
// Issue : If the file already exists, it will overwrite the existing file. So, if you run the above code multiple times, it will keep overwriting the file "hello.txt" with "Hello World!".



// create folder :

// 1) mkdir() method : It is used to create a new folder.
// fs.mkdir(path, callback function)
// fs.mkdir("myFolder", (err) => {
//     if (err) throw err;      
//     console.log("Folder created successfully.")
// });

// create nested folder :
// fs.mkdir(path, {options}, callback function)
// fs.mkdir("CSS/Home/Style", {recursive: true}, (err) => {
//     if (err) throw err;      
//     console.log("Nested folder created successfully.")
// });



// read file :

// 1) readFile() method : It is used to read the content
// fs.readFile(path, {option(utf-8)}, callback function(error, data))
// fs.readFile("hello.txt", "utf-8", (err, data) => {
//     if (err) throw err;      
//     console.log(data);
// });

// 2) read folder :
// fs.readdir(path, callback function(error, data))
// fs.readdir("CSS/Home/Style", (err, files) => {
//     if (err) throw err;      
//     console.log(files);
// });



// copy file :

// 1) copyFile() method : It is used to copy a file from one location to another.
// fs.copyFile(src, dest, callback function(error))
// fs.copyFile("hello.txt", "CSS/Home/Style/copy.txt", (err) => {
//     if (err) throw err;      
//     console.log("File copied successfully.")
// });



// rename file :

// 1) rename() method : It is used to rename a file or folder.
// fs.rename(oldPath, newPath, callback function(error))    
// fs.rename("hello.txt", "greet.txt", (err) => {
//     if (err) throw err;      
//     console.log("File renamed successfully.")
// });

// nest file rename :
// fs.rename(oldPath, newPath, callback function(error))    
// fs.rename("CSS/Home/Style/copy.txt", "CSS/Home/Style/rename.txt", (err) => {     
//     if (err) throw err;      
//     console.log("Nested file renamed successfully.")
// });

// 2) rename folder :
// fs.rename(oldPath, newPath, callback function(error))    
// fs.rename("CSS/Home/Style", "CSS/Home/Design", (err) => {     
//     if (err) throw err;      
//     console.log("Folder renamed successfully.")
// });



// delete file :

// 1) unlink() method : It is used to delete a file.
// fs.unlink(path, callback function(error))
// fs.unlink("greet.txt", (err) => {
//     if (err) throw err;      
//     console.log("File deleted successfully.")
// });

// 2) rm method : It is used to delete a file or folder.
// fs.rm(path, callback function(error))
// fs.rm("CSS/Home/Design/rename.txt", (err) => {
//     if (err) throw err;      
//     console.log("Folder deleted successfully.")
// });

// delete folder :

// Note : if node version is less then 25 then use fs.rmdir() method to delete folder. But if node version is 25 or above then use fs.rm() method to delete folder. Because fs.rmdir() method is deprecated in node version 25 and above.
// fs.rmdir(path, {options}, callback function(error))
fs.rmdir("CSS/Home/Design", {recursive: true, force: true}, (err) => {
    if (err) throw err;      
    console.log("Folder deleted successfully.")
});