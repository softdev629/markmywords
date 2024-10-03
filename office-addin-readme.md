# Comprehensive Guide: Office Add-in Project (Word) - PowerShell Version

This project is a Microsoft Word Add-in developed using React and Office.js. This guide provides detailed instructions for setting up, running, and troubleshooting the project on Windows using PowerShell.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Installing Dependencies](#installing-dependencies)
4. [Running the Development Server](#running-the-development-server)
5. [Starting the Add-in](#starting-the-add-in)
6. [Manually Sideloading the Add-in](#manually-sideloading-the-add-in)
7. [Development Workflow](#development-workflow)
8. [Stopping the Add-in](#stopping-the-add-in)
9. [Troubleshooting](#troubleshooting)
10. [Additional Resources](#additional-resources)

## Prerequisites

Ensure you have the following installed on your Windows machine:
- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Microsoft Word (desktop version)
- Visual Studio Code (recommended, but any code editor will work)
- Git (for version control and cloning the repository)

## Initial Setup

1. Open PowerShell as an administrator.

2. Navigate to the directory where you want to store your project:
   ```powershell
   Set-Location -Path $env:USERPROFILE\Documents
   ```

3. Clone the repository (replace with your actual repository URL):
   ```powershell
   git clone https://github.com/YourRepository/markmywords.git
   ```

4. Navigate into the project directory:
   ```powershell
   Set-Location -Path .\markmywords-main\markmywords
   ```

## Installing Dependencies

1. In the project directory, install the required dependencies:
   ```powershell
   npm install
   ```

2. If you encounter any issues, try clearing the npm cache and reinstalling:
   ```powershell
   npm cache clean --force
   npm install
   ```

3. Install global dependencies:
   ```powershell
   npm install -g yo generator-office
   npm install -g office-addin-cli
   ```

## Running the Development Server

1. In the project directory, start the development server:
   ```powershell
   npm run dev-server
   ```

2. If you encounter a "webpack not recognized" error, try running:
   ```powershell
   npx webpack serve --mode development
   ```

3. If prompted to install webpack-cli, type 'y' and press Enter to agree to the installation.

4. The dev server should now be running. You should see output indicating that the server is running on https://localhost:3000/

5. Keep this PowerShell window open while working on your add-in.

## Starting the Add-in

1. Open a new PowerShell window as administrator.

2. Navigate to your project directory:
   ```powershell
   Set-Location -Path $env:USERPROFILE\Documents\markmywords-main\markmywords
   ```

3. Run the following command to start the add-in:
   ```powershell
   npm run start
   ```

4. This should launch Microsoft Word and attempt to sideload your add-in.

5. If you want more detailed logs, you can use:
   ```powershell
   npx --loglevel verbose office-addin-debugging start manifest.xml
   ```

## Manually Sideloading the Add-in

If the add-in doesn't load automatically, follow these steps:

1. Open Microsoft Word.
2. Go to the Insert tab.
3. Click on "My Add-ins".
4. Choose "Upload My Add-in".
5. Browse to your project directory and select the `manifest.xml` file.

## Development Workflow

1. The main source code for the add-in is located in the `src` directory.
2. As you make changes to your code, the dev server will automatically recompile.
3. To see your changes, you may need to close and reopen the add-in in Word.
4. Use `console.log()` statements in your code for debugging. These will appear in the browser's console when you're debugging.

## Stopping the Add-in

To stop the add-in and the development server:

1. Close Microsoft Word.
2. In the PowerShell window running the dev-server, press Ctrl+C and confirm to terminate the batch job.
3. In the PowerShell window where you ran `npm run start`, press Ctrl+C to stop the debugging process.

## Troubleshooting

- **"webpack not recognized" error**: Make sure you've installed all dependencies. If the error persists, try `npx webpack serve --mode development`.

- **Add-in not loading**: Clear the Office cache:
  1. Close all Office applications.
  2. Delete the contents of the folder:
     ```powershell
     Remove-Item -Path "$env:LOCALAPPDATA\Microsoft\Office\16.0\Wef\*" -Recurse -Force
     ```
  3. Restart your add-in process.

- **Compilation errors**: Check the terminal where you're running the dev server for specific error messages. Most often, these are due to syntax errors in your code.

- **Changes not reflecting**: Ensure your dev server is running. Try closing and reopening the add-in in Word.

- **Port conflicts**: If port 3000 is already in use, you can change the port in your `package.json` file under the `config` section.

- **Checking processes using a specific port**: To check if any process is using port 3000, use:
  ```powershell
  Get-NetTCPConnection -LocalPort 3000
  ```

- **Killing a process using a specific port**: To kill a process using port 3000, use:
  ```powershell
  Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
  ```

## Additional Resources

- [Official Microsoft Office Add-ins Documentation](https://docs.microsoft.com/en-us/office/dev/add-ins/)
- [Office Add-ins Patterns and Practices](https://github.com/OfficeDev/Office-Add-in-samples)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Webpack Documentation](https://webpack.js.org/concepts/)

Remember to regularly commit your changes to version control as you develop your add-in:
```powershell
git add .
git commit -m "Your commit message"
git push origin main
```

