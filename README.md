# robotjs-lang

A language that i made for fun which lets you use robot.js easily

## Functions

### Mouse

- Can click mouse.
- Syntax: mouse [click] [left|right|middle] [once|double]

#### Examples:

```
mouse click left once

mouse click right double

mouse click middle once
```

### Wait

- Waits in seconds.
- Syntax: wait [seconds: positive float]

#### Examples:

```
wait 5
wait .3
```

### goto

- Goes to a line.
- Syntax: goto [line: positive integer]

#### Examples:

```
console log Hello, world!
goto 1
```

### Visit

- Visits a line and gets back to the current line.
- Note: The difference between visit and goto is goto sets the line as the given line but visit only runs the give line.
- Syntax: [line: positive integer]

#### Examples:

```
visit 3
stop
console log Hello, there.
```

### Stop

- Stops the process.
- Syntax: stop

#### Examples:

```
console log Hello, world!
stop
It won't process this line since it will have stopped.
```

### Keyboard

- Taps key or types text on keyboard.
- Syntax: keyboard [tap|type] [keyOrString: string]

#### Examples:

```
keyboard tap a

keybord type Hello, world!
```

### Console

- Types things or clears console.
- Note: Console log is equal to using print with a line break at the end.
- Syntax: console [log|print] [text: string] OR console [clear]

#### Examples:

```
console clear
console log Hello my name is
console print % %Jack
```

### run

- Runs files.
- Note: If file doesn't exist tries adding .rjs at the end.
- Syntax: run [file: string]

#### Examples:

```
run hello.rjs

run hello
```

### Lang

- Sets the language.
- Note: Same as using `config lang`.
- Syntax: lang [tr|en]

#### Examples:

```
lang en
```

### Config

- Sets properties on config.
- Default config:
    - functionResponses: Can be enabled by adding `--responses` at the end of the command. If enabled sends success
      messages. Default: `false`
    - lang: Can be set by using `--lang LANGUAGE`. Sets the language. Default: `en`
    - errorCrash: Can be enabled by adding `--error-crash` at the end of the command. If enabled crashes on errors.
      Default: `false`
- Syntax: config [functionResponses|lang|errorCrash] [value: string|number|true|false]

#### Examples:

```
config functionResponses true

config lang tr

config errorCrash true
```

### Var

- Sets a local variable.
- Syntax: var [name: string] [value: string|number]

#### Examples:

```
var a 10
var b 20
```

### Global

- Sets a global variable.
- Syntax: global [name: string] [value: string|number]

#### Examples:

```
global a 10
global b 20
```

### Input

- Waits a response from the console and puts it into the variable.
- Syntax: input [variable: string] [local|global]

#### Examples:

```
input a local
```

### If

- Checks if statement is true if yes runs the code.
- Syntax: if [variable: string] [=|!=|<|>|<=|=<|>=|=>] [variable: string] [code: string]

#### Examples:

```
var a 10
var b 10
if a = b console log Yeah, they are equal!
```

### Save

- Saves a variable to a file.
- Syntax: save [set] [variable: string] [value: string|number] OR save [file] [file: string]

#### Examples:

```
save file hello.json
save set a 10
```

## Embedding

### Variables

- Embeds variable.
- Syntax: `%var NAME%`

```
var hello 10
console log Hello variable's value: %var hello%
```

### Empty

- Does nothing. Can be used for preventing other embeds.
- Syntax: `%%`

```
console log %%
console log %%%var test%
```

### Line

- Adds a line break.
- Syntax: `%\n%`

```
console log %\n%
```

### Space

- Adds space.
- Syntax: `% %`

```
console log Hello,% %world!
```

### Percent

- Adds % symbol.
- Syntax: `%%%`

```
console log Percent symbol: %%%
```

### PI

- Adds PI.
- Syntax: `%pi%`

```
console log PI is %pi%
```

### E

- Adds E.
- Syntax: `%e%`

```
console log E is %e%
```

### Repeat

- Repeats a text.
- Syntax: `%repeat NUMBER TEXT%`

```
console log %repeat 10 Hello, world! %
```

### Math

- Does math.
- Syntax: `%math NUMBER[+|-|*|/|**]NUMBER%`

```
console log %math 10+10%
```

### Join

- Joins two or more numbers as texts.
- Syntax: `%join NUMBER...%`

```
console log %join 10 20 30 40%
```

### Max

- Finds the biggest number.
- Syntax: `%max NUMBER...%`

```
console log %max 40 60 1 40 100%
```

### Min

- Finds the smallest number.
- Syntax: `%min NUMBER...%`

```
console log %min 40 60 1 40 100%
```

### Rand

- Gives a random float number between 0 and 1.
- Syntax: `%rand%`

```
console log %rand%
```

### Random

- Gives a random integer between given numbers.
- Syntax: `%random INTEGER INTEGER%`

```
console log %random -10 10%
```

### RandomF

- Gives a random float between given float numbers.
- Note: Last number is depth and identifies the length of numbers after the `.`
- Syntax: `%randomf FLOAT FLOAT NUMBER%`

```
console log %randomf 1.5 2 10%
```

### Mathematical Functions

- Syntax: `%FUNCTION FLOAT%`
- Functions: `sqrt`, `abs`, `floor`, `ceil`, `round`, `sin`, `cos`, `tan`, `trunc`, `log1p`, `exp`, `sign`, `acos`
  , `acosh`, `asin`, `asinh`, `atan`, `atanh`, `cbrt`, `clz32`, `cosh`, `expm1`, `fround`, `log`, `log2`, `log1p`
  , `log10`

### TODO

finish jsautogui and use that instead