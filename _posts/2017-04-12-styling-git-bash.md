---
layout: post
title:  "Styling Git Bash"
excerpt: "How to style and modify your git-bash prompt"
banner: http://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491716273/git-win.png
author: "Vishnu"
date:   2017-04-12 00:00:10
categories: Git
comments: true
---
When it comes to the tools I use, I like minimalism. I like to have the bare minimum of everything and make them look good. This is one of the reasons though an IDE can be really useful in some cases, I always stick to code editors like **VSCode** that I currently use.

Since I mentioned VSCode, I love using the built-in terminal that ships with it. On Windows, I use Git Bash as integrated terminal within VSCode. You can add any of the terminals you like by adding any one of the following statement into your settings file.

```js
// 64-bit cmd if available, otherwise 32-bit
"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\cmd.exe"
// 64-bit PowerShell if available, otherwise 32-bit
"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\WindowsPowerShell\\v1.0\\powershell.exe"
// Git Bash
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"
// Bash on Ubuntu (on Windows)
"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\bash.exe"
```

This is how normally the git-bash prompt looks like from within VSCode:

<figure>
  <img src="http://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491753329/git/original.jpg" alt="Default Git Bash">
  <figcaption>Default git bash</figcaption>
</figure>

But since I am a minimalist, this is how mine looks like :wink:. Yes, just a `->`

<figure>
  <img src="http://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491753329/git/transformed.jpg" alt="My minimal git bash">
  <figcaption>My minimal git bash</figcaption>
</figure>

Or you can have the `->` (or any other symbol) with the current working directory displayed as here:

<figure>
  <img src="http://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491799242/git/withdir.jpg" alt="Git bash with current working directory">
  <figcaption>Git bash with current working directory</figcaption>
</figure>

So how do we do it? To make this change we need to go into the `C:\Program Files\Git\etc\profile.d\` folder and find the `git-prompt.sh` file. It looks something like this:

```bash
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
PS1="$PS1"'\u@\h '             # user@host<space>
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
```

Yes, all this looks a little cryptic if you have never looked into shell scripts. But let's not worry too much. You don't need to know a whole lot to customise the shell. 

There are some stuff you might or might not need here.  If you need a minimalist terminal, you can get rid of the user and host details, to some extent, the current path details and modify it in a way that only the current working directory is visible along with the prompt.

Let us start by modifying the title. I like to keep something like `Git-Bash` with the current working directory in the title. For this, remove `$TITLEPREFIX` from the line `PS1='\[\033]0;$TITLEPREFIX:${PWD//[^[:ascii:]]/?}\007\]'` and add something like this `PS1='\[\033]0;Git-Bash: ${PWD//[^[:ascii:]]/?}\007\]'`. This will change the title to "Git-Bash: <path to current working directory>".

Next, remove the whole `if` section since we have added a custom title:

```bash
if test -f /etc/profile.d/git-sdk.sh
then
    TITLEPREFIX=SDK-${MSYSTEM#MINGW}
else
    TITLEPREFIX=$MSYSTEM
fi
```

Next, removing the following lines will remove `MINGW64` from the prompt:

`PS1="$PS1"'\[\033[35m\]' # change to purple`

`PS1="$PS1"'$MSYSTEM ' # show MSYSTEM`

Things like `PS1="$PS1"'\[\033[32m\]' ` are used to set the colour of the string that follows. `[32m\]` denotes that the colour has to be green. Here are few colours that can be applied:


|  # | Colour  |
|:--:|:-------:|
| 30 | Black   |
| 31 | Red     |
| 32 | Green   |
| 33 | Yellow  |
| 34 | Blue    |
| 35 | Magenta |
| 36 | Cyan    |
| 37 | White   |

VSCode has it's own Git integration, so I do not need my command promp to show me any git related details like brank or uncommitted files etc. So I removed the following lines to disable git support. Yes I know that kind of beats the purpose of "git" bash, but then VSCode already gives me everything.

```bash
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
```

After all the editing, this is how your file should look like:

```bash
# set window title
PS1='\[\033]0;Git-Bash: ${PWD//[^[:ascii:]]/?}\007\]'
PS1="$PS1"'\n'                 # new line
PS1="$PS1"'\[\033[32m\]'       # change to green
PS1="$PS1"'➜ '                # ➜
PS1="$PS1"'\[\033[0m\]'        # change color
MSYS2_PS1="$PS1"               # for detection by MSYS2 SDK's bash.basrc
```

This is how it looks like after all the cosmetic changes:

<figure>
  <img src="http://res.cloudinary.com/vishnupadmanabhan/image/upload/v1491936192/git/final.jpg" alt="Final Git-Bash">
  <figcaption>Final Git-Bash</figcaption>
</figure>

Here is a little screencast I tried making in a free app (hence the big ass watermark!) to give an overview of what I listed in the post. It might act as a suppliment for the post. Give it a watch. First time screencasting with a bout of cold, so watch out for :poop:

<div class="embed-responsive embed-responsive-16by9">
    <iframe src="https://www.youtube.com/embed/rSGpbmmBugc?rel=0&amp;showinfo=0" frameborder="0"></iframe>
</div>



So there you have it, your wonderful looking git-bash nicely integrated with your VSCode. Go play around with it, add your own symbols to the prompt using character map in windows.
