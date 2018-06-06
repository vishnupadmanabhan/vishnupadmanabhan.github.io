---
layout: post
title:  ".NET Core - Intro"
excerpt: "Getting started with .NET Core in VSCode"
banner: http://res.cloudinary.com/vishnupadmanabhan/image/upload/v1489831960/NET.jpg
author: "Vishnu"
date:   2017-03-17 00:01:00
categories: ASP.NET
comments: true
---
I programmed for the first time ever back in Turbo C++ days. I was thankful that I choose Computer Science as my major in high school instead of Biology. I knew that I wanted to be doing something with computers for my career. I was fascinated as I wrote simple code into the IDE with bright blue background and overly colourful code syntax highlighting.

Here is a little taste of nostalgia :wink:

<figure>
  <img src="http://res.cloudinary.com/vishnupadmanabhan/image/upload/v1489523714/tcpp.jpg" alt="Trubo C++ IDE">
  <figcaption>Image attr: By <a href="//commons.wikimedia.org/w/index.php?title=User:SAMNAD.S&amp;action=edit&amp;redlink=1" class="new" title="User:SAMNAD.S (page does not exist)">SAMNAD.S</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="http://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=23104129" target="_blank">Link</a></figcaption>
</figure>

It was a moment of bliss to see the computer obey your instructions and execute the code the way you instructed it to do. Most of the times, it was just a simple program to create Fibonacci series or to multiply two matrices. But when the code ran without errors and output console displayed the desired result, I was ecstatic!

I took C++ classes very seriously and somewhere I realised that I am really happy when I am in front of a computer. Those days we did not have the internet at home, so anything online had to happen in internet cafes. It was the age of the internet. Websites were coming up in thousands and the technology behind the web was constantly evolving.

As a part of school curriculum, we were also taught to write HTML. It didn't feel like a serious programming language as all it had were some tags and it just changed the way text was displayed on the web page. I was not very keen on it. But when I got my hands on a software called Microsoft Frontpage, which let me create web elements and link different pages into a website, I was hooked... again!

I loved the idea of a website. Information in rich multimedia format linked to each other in a seamless manner was fascinating. I am a big fan of Formula 1 racing. I was into playing F1 games too. I remember creating a local website which had all the information related to F1 cars, drivers and tracks. It was a ridiculous looking website that I created using Frontpage. Bright coloured gradient buttons, marquees etc. But I learnt a lot from creating that website and my interest in the web was born.

So far it was all static websites. I had never tried dynamic websites. During college, I was more into Electronics as it was my major, but the love for programming was revived after I finished college. When I got a job, I got an opportunity to create a web application using .NET framework. ASP.NET MVC was in its early stages at that point so I did not venture into it and I did not know what MVC is.

I created the app in C# .NET and was fascinated with Master Pages. I had very feeble CSS skills and mostly relied on the visual mode to make the changes. But I did have fun making it. It had some interaction with Excel and was successfully able to complete the project. 

That was my first experience creating a dynamic web app. I was impressed with Microsoft but still felt that web development could be little more streamlined. But it stirred my interest in creating dynamic web applications and learn more about web technologies. 

I explored PHP as a backend language and started coding in it since it was easy to learn. I got a job as a designer where I delved deeper into HTML and CSS along with PHP. I loved creating little web applications. From there the natural progression was to frameworks and since I was into PHP, the first framework I really learnt was [Laravel](https://laravel.com){:target="_blank"}.

Laravel was fun because it was relatively easy to learn and has a wonderful API to build web applications rapidly. For years Laravel was my go-to framework for building web apps. I moved away from Microsoft and wasn't a fan anymore since I felt all the tools required Microsoft ecosystem to support the development process. But it all changed recently.

Lately, Microsoft has been showing great interest in open source software. They have been working on improving the MVC framework and also release a free version of Visual Studio - the community edition. I looked back into .NET after I joined my current company where the main stack is .NET. I had an opportunity to help a development team with some Angular JS work and in the process, I looked into the MVC part of the framework. I should say that I was impressed with how .NET MVC has evolved.

So following what they do, I decided to try on the latest goodness - .NET Core. Since I migrated to Windows recently from Linux (Ubuntu), I am very comfortable using the command line. So I decided to use .NET CLI with [Visual Studio Code](https://visualstudio.com){:target="_blank"}. VSCode is an awesome open source cross platform code editor release by Microsoft. I absolutely love it and it has become my main text editor since more than a year now. I use it to write my blog as it has amazing markdown support along with integrated Git support.

So, few days back, I decided to dive in and give it a go. Since Visual Studio 2017 was [released on March 7](https://www.youtube.com/watch?v=ra3Pd8KoVOw){:target="\_blank"}, I had installed it and along with it Core was installed as well. But the usual way to install Core is by either going to [dot.net](https://dot.net){:target="\_blank"} (cool domain name isn't it?) or [here](https://www.microsoft.com/net/core){:target="\_blank"}.

So .NET Core has reached version 1.1 and has a CLI support now. With Core 1.1, the cross platform support has now been extended to **Linux Mint 18**, **Open Suse 42.1**, **Mac OS 10.12** and **Windows Server 2016**.

Once you follow the instructions and get Core installed, in your command prompt (or terminal for Mac and Linux) you get access to the `dotnet` command. Type `dotnet new` into the command line. I like to use the built in command line withing VSCode which looks like this:

<figure>
  <img src="http://res.cloudinary.com/vishnupadmanabhan/image/upload/v1489612427/NetCore/VSCodeShell.jpg" alt="VSCode Shell">
  <figcaption>Built in terminal within VSCode</figcaption>
</figure>

Once you type `dotnet new` you see the following output:

```powershell
PS D:\Code\CoreMVC> dotnet new
Template Instantiation Commands for .NET Core CLI.
Usage: dotnet new [arguments] [options]
Arguments:
  template  The template to instantiate.
Options:
  -l|--list         List templates containing the specified name.
  -lang|--language  Specifies the language of the template to create
  -n|--name         The name for the output being created. If no name is specified, the name of the current directory is used.
  -o|--output       Location to place the generated output.
  -h|--help         Displays help for this command.
  -all|--show-all   Shows all templates

Templates                 Short Name      Language      Tags
----------------------------------------------------------------------
Console Application       console         [C#], F#      Common/Console
Class library             classlib        [C#], F#      Common/Library
Unit Test Project         mstest          [C#], F#      Test/MSTest
xUnit Test Project        xunit           [C#], F#      Test/xUnit
ASP.NET Core Empty        web             [C#]          Web/Empty
ASP.NET Core Web App      mvc             [C#], F#      Web/MVC
ASP.NET Core Web API      webapi          [C#]          Web/WebAPI
Solution File             sln                           Solution

Examples:
    dotnet new mvc --auth None --framework netcoreapp1.1
    dotnet new mstest --framework netcoreapp1.1
    dotnet new --help
```
As you can see, there are various arguments that can be used to decide whether the app should be MVC or command line etc. We will start with a console application. To create a console app, type following into your command line:

```powershell
PS D:\Code\ConCore> dotnet new console
```

Once the project is created, run `dotnet restore` to install all the dependencies.

```powershell
PS D:\Code\ConCore> dotnet restore
```

Once all the dependencies are installed, `dotnet run` command runs the app

```powershell
PS D:\Code\ConCore> dotnet run
```
As you have the first .NET Core app created within your project folder, you'll notice that you have two files, namely `ConCore.csproj` and `Program.cs`.

The `ConCore.csproj` is the file that is used for managing dependencies for the project. This file is named after your project name. Earlier Core had a  `project.json` file to handle the dependencies and configurations, but Microsoft went in favour of `csproj` file support MSBuild to enable portable class libraries from .NET Core projects and .NET standard libraries from .NET Framework projects. MSBuild also build large projects. That being said, if you open an old project in Visual Studio 2017, it will upgrade your project to work with the `csproj` filetype. If you open the `csproj` file, you'll see something similar:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp1.1</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore" Version="1.1.1" />
  </ItemGroup>
</Project>
```

`Program.cs` file contains the main class that prints `Hello World!` to the console.

```csharp
using System;

namespace ConCore
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

When you type `dotnet run` at the terminal you get the following output:

```powershell
PS D:\Code\ConCore> dotnet run
Hello World!
```

There you have your first .NET Core console app running! Now let's make our simple program accept user input and then respond accordingly. Let's modify our `Program.cs` file as follows:

```csharp
using System;

namespace ConCore
{
    class Program
    {
        static void Main(string[] args)
        {
            string name; // declaring variable
            Console.WriteLine("Please enter your name: ");
            name = Console.ReadLine(); // assigning input to variable.
            Console.WriteLine($"Hello {name}!");
        }
    }
}
```

The output when we run the above program will be:

```powershell
PS D:\Code\ConCore> dotnet run
Please enter your name: 
Harvey
Hello Harvey
```

So there you go, you have your first basic .NET Core app setup. We will continue exploring Core and will take a look at MVC and WebApi in core in upcoming posts. If you love building web apps, give .NET Core a try. Microsoft doesn't disappoint this time.