---
layout: post
title:  "Styling Git Bash for Windows"
author: vishnu
categories: [tech]
image: https://images.unsplash.com/photo-1556075798-4825dfaaf498
tags: featured
published: false
---

When it comes to the tools I use, I like minimalism. I  like to have the bare minimum of everything and make them look good.  This is one of the reasons though an IDE can be really useful in some  cases, I always stick to code editors like **VSCode** that I currently use.

Since I mentioned VSCode, I love using the built-in terminal that  ships with it. On Windows, I use Git Bash as integrated terminal within  VSCode. You can add any of the terminals you like by adding any one of  the following statement into your settings file. Js

    // 64-bit cmd if available, otherwise 32-bit
    "terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\cmd.exe"
    // 64-bit PowerShell if available, otherwise 32-bit
    "terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\WindowsPowerShell\\v1.0\\powershell.exe"
    // Git Bash
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"
    // Bash on Ubuntu (on Windows)
    "terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\bash.exe"
    
    

This is how normally the git-bash prompt looks like from within VSCode:

![](https://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491753329/git/original.jpg)

But since I am a minimalist, this is how mine looks like. Yes, just a `->`

![](https://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491753329/git/transformed.jpg)

Or you can have the `->` (or any other symbol) with the current working directory displayed as here:

![](https://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491799242/git/withdir.jpg)

So how do we do it? To make this change we need to go into the `C:\Program Files\Git\etc\profile.d\` folder and find the `git-prompt.sh` file. It looks something like this: Bash

    if test -f /etc/profile.d/git-sdk.sh
    then
        TITLEPREFIX=SDK-${MSYSTEM#MINGW}
    else
        TITLEPREFIX=$MSYSTEM
    fi
    
    # set window title
    PS1='\[\033]0;$TITLEPREFIX:${PWD//[^[:ascii:]]/?}\007\]' 
    PS1="$PS1"'\n'                 # new line
    PS1="$PS1"'\[\033[32m\]'       # change to green
    PS1="$PS1"'\[email protected]\h '             # [email protected]<space>
    PS1="$PS1"'\[\033[35m\]'       # change to purple 
    PS1="$PS1"'$MSYSTEM '          # show MSYSTEM
    PS1="$PS1"'\[\033[33m\]'       # change to brownish yellow
    PS1="$PS1"'\w '                 # current working directory
    
    if test -z "$WINELOADERNOEXEC"
    then
        GIT_EXEC_PATH="$(git --exec-path 2>/dev/null)"
        COMPLETION_PATH="${GIT_EXEC_PATH%/libexec/git-core}"
        COMPLETION_PATH="${COMPLETION_PATH%/lib/git-core}"
        COMPLETION_PATH="$COMPLETION_PATH/share/git/completion"
        if test -f "$COMPLETION_PATH/git-prompt.sh"
        then
            . "$COMPLETION_PATH/git-completion.bash"
            . "$COMPLETION_PATH/git-prompt.sh"
            PS1="$PS1"'\[\033[36m\]'  # change color to cyan
            PS1="$PS1"'`__git_ps1` '   # bash function
        fi
    fi
    PS1="$PS1"'\[\033[0m\]'        # change color
    PS1="$PS1"'\n'                 # new line
    PS1="$PS1"' $ '                 # prompt: always $
    MSYS2_PS1="$PS1"               # for detection by MSYS2 SDK's bash.basrc
    
    

Yes, all this looks a little cryptic if you have never looked into  shell scripts. But let’s not worry too much. You don’t need to know a  whole lot to customise the shell.

There are some stuff you might or might not need here.  If you need a  minimalist terminal, you can get rid of the user and host details, to  some extent, the current path details and modify it in a way that only  the current working directory is visible along with the prompt.

**Note:** You might need to run your editor as an  administrator to be able to edit the profile.d file since by default  Windows protects all the files under the "Program Files" folder.

Let us start by modifying the title. I like to keep something like `Git-Bash` with the current working directory in the title. For this, remove `$TITLEPREFIX` from the line `PS1='\[\033]0;$TITLEPREFIX:${PWD//[^[:ascii:]]/?}\007\]'` and add something like this `PS1='\[\033]0;Git-Bash: ${PWD//[^[:ascii:]]/?}\007\]'`. This will change the title to “Git-Bash: path to current working directory”.

Next, remove the whole `if` section since we have added a custom title: Bash

    if test -f /etc/profile.d/git-sdk.sh
    then
        TITLEPREFIX=SDK-${MSYSTEM#MINGW}
    else
        TITLEPREFIX=$MSYSTEM
    fi

Next, removing the following lines will remove `MINGW64` from the prompt:

`PS1="$PS1"'\[\033[35m\]' # change to purple`

`PS1="$PS1"'$MSYSTEM ' # show MSYSTEM`

Things like `PS1="$PS1"'\[\033[32m\]'` are used to set the colour of the string that follows. `[32m\]` denotes that the colour has to be green. Here are few colours that can be applied:

| #  | Colour  |
|----|---------|
| 30 | Black   |
| 31 | Red     |
| 32 | Green   |
| 33 | Yellow  |
| 34 |  Blue   |
| 35 | Magenta |
| 36 | Cyan    |
| 37 | White   |

VSCode has it’s own Git integration, so I do not need my command  promp to show me any git related details like brank or uncommitted files  etc. So I removed the following lines to disable git support. Yes I  know that kind of beats the purpose of “git” bash, but then VSCode  already gives me everything.

    if test -z "$WINELOADERNOEXEC"
    then
        GIT_EXEC_PATH="$(git --exec-path 2>/dev/null)"
        COMPLETION_PATH="${GIT_EXEC_PATH%/libexec/git-core}"
        COMPLETION_PATH="${COMPLETION_PATH%/lib/git-core}"
        COMPLETION_PATH="$COMPLETION_PATH/share/git/completion"
        if test -f "$COMPLETION_PATH/git-prompt.sh"
        then
            . "$COMPLETION_PATH/git-completion.bash"
            . "$COMPLETION_PATH/git-prompt.sh"
            PS1="$PS1"'\[\033[36m\]'  # change color to cyan
            PS1="$PS1"'`__git_ps1` '   # bash function
        fi
    fi

After all the editing, this is how your file should look like: Bash

    # set window title
    PS1='\[\033]0;Git-Bash: ${PWD//[^[:ascii:]]/?}\007\]'
    PS1="$PS1"'\n'                 # new line
    PS1="$PS1"'\[\033[32m\]'       # change to green
    PS1="$PS1"'➜ '                # ➜
    PS1="$PS1"'\[\033[0m\]'        # change color
    MSYS2_PS1="$PS1"               # for detection by MSYS2 SDK's bash.basrc
    
    

This is how it looks like after all the cosmetic changes:

![](https://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491936192/git/final.jpg)

So there you have it, your wonderful looking git-bash nicely  integrated with your VSCode. Go play around with it, add your own  symbols to the prompt using character map in windows.
