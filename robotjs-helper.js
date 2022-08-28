const CONFIG = {
    functionResponses: false,
    lang: "en"
};

const {stdin} = process;
stdin.setRawMode(true);
const _stdinData = [];

const onStdinData = cb => {
    _stdinData.push(cb);
    stdin.on("data", cb);
    return {
        remove: () => {
            _stdinData.splice(_stdinData.indexOf(cb), 1);
            stdin.off("data", cb);
        }
    };
};

const strings = {
    en: {
        "mouse-name": "mouse",
        "mouse-click": "click",
        "mouse-click-usage": "Usage: mouse click <right, left, middle> <once, double>",
        "mouse-click-left": "left",
        "mouse-click-right": "right",
        "mouse-click-middle": "middle",
        "mouse-click-once": "once",
        "mouse-click-double": "double",
        "mouse-click-button": args => "Invalid button: " + args[1] + ", you have to use one of these: right | left | middle",
        "mouse-click-type": args => "Invalid click type: " + args[2] + ", you have to use one of these: once | double",
        "mouse-click-success": "Clicked mouse.",
        "mouse-usage": "Usage: mouse <click>",
        "wait-name": "wait",
        "wait-usage": "Usage: wait <seconds>",
        "wait-number": n => "Invalid number: " + n,
        "wait-small": "The number should be bigger or equal to zero.",
        "wait-success": n => "Waited " + n + " seconds.",
        "goto-name": "goto",
        "goto-file": "Goto method can only be used in files.",
        "goto-usage": "Usage: goto <number>",
        "goto-number": args => "Invalid number: " + args[0],
        "goto-integer": lines => "Line number should be an integer between 1 and " + lines.length + ".",
        "goto-negative": "Line number should be positive.",
        "goto-already": to => "You are already at " + to + ". line.",
        "goto-overflow": to => to + ". line is out of the code.",
        "goto-success": to => "Line has been set to " + to + ".",
        "stop-name": "stop",
        "stop-usage": "Usage: stop",
        "stop-success": "Stopped.",
        "keyboard-name": "keyboard",
        "keyboard-tap": "tap",
        "keyboard-tap-usage": "Usage: keyboard tap <key>",
        "keyboard-tap-fail": args => "Couldn't press key: " + args[1],
        "keyboard-tap-success": args => "Pressed key: " + args[1],
        "keyboard-type": "type",
        "keyboard-type-usage": "Usage: keyboard type <text>",
        "keyboard-type-fail": t => "Couldn't type text: " + t,
        "keyboard-type-success": t => "Typed text: " + t,
        "keyboard-usage": "Usage: keyboard <tap, type>",
        "console-name": "console",
        "console-log": "log",
        "console-clear": "clear",
        "console-clear-success": "Cleared console.",
        "console-usage": "Usage: console <log, clear>",
        "run-name": "run",
        "run-usage": "Usage: run <file>",
        "run-fail": "Failed to run file.",
        "run-success": file => "Successfully ran file: " + file,
        "command-not-found": args => "Command not found: " + args[0].toLowerCase(),
        "command-run-line": "Line"
    },
    tr: {
        "mouse-name": "fare",
        "mouse-click": "tıkla",
        "mouse-click-usage": "Kullanım: fare tıkla <sağ, sol, orta> <tek, çift>",
        "mouse-click-left": "sol",
        "mouse-click-right": "sağ",
        "mouse-click-middle": "orta",
        "mouse-click-once": "tek",
        "mouse-click-double": "çift",
        "mouse-click-button": args => "Geçersiz buton: " + args[1] + ", şunlardan birini kullanmanız gerek: sağ | sol | orta",
        "mouse-click-type": args => "Geçersiz tıklama türü: " + args[2] + ", şunlardan birini kullanmanız gerek: tek | çift",
        "mouse-click-success": "Fareye tıklanıldı.",
        "mouse-usage": "Kullanım: fare <tıkla>",
        "wait-name": "bekle",
        "wait-usage": "Kullanım: bekle <saniye>",
        "wait-number": n => "Geçersiz sayı: " + n,
        "wait-small": "Beklenilecek süre 0 veya 0'dan büyük olmalı.",
        "wait-success": n => n + " saniye beklenildi.",
        "goto-name": "satır",
        "goto-file": "Satır fonksiyonunu sadece dosyalarda kullanabilirsin.",
        "goto-usage": "Kullanım: satır <sayı>",
        "goto-number": args => "Geçersiz sayı: " + args[0],
        "goto-integer": lines => "Satır sayısı 1 ile " + lines.length + " arasındaki bir doğal sayı olmalı.",
        "goto-negative": "Satır sayısı birden küçük olamaz.",
        "goto-already": to => "Zaten " + to + ". satırdasın.",
        "goto-overflow": to => to + ". satır kodun dışına çıkıyor.",
        "goto-success": to => "Satır " + to + " olarak ayarlandı.",
        "stop-name": "durdur",
        "stop-usage": "Kullanım: durdur",
        "stop-success": "Durduruldu.",
        "keyboard-name": "klavye",
        "keyboard-tap": "bas",
        "keyboard-tap-usage": "Kullanım: klavye bas <tuş>",
        "keyboard-tap-fail": args => "Tuşa basılamadı: " + args[1],
        "keyboard-tap-success": args => "Tuşa basıldı: " + args[1],
        "keyboard-type": "yaz",
        "keyboard-type-usage": "Kullanım: klavye yaz <yazı>",
        "keyboard-type-fail": t => "Yazı yazılamadı: " + t,
        "keyboard-type-success": t => "Yazı yazıldı: " + t,
        "keyboard-usage": "Kullanım: klavye <bas, yaz>",
        "console-name": "konsol",
        "console-log": "yaz",
        "console-clear": "temizle",
        "console-clear-success": "Konsol temizlendi.",
        "console-usage": "Kullanım: konsol <yaz, temizle>",
        "run-name": "çalıştır",
        "run-usage": "Kullanım: çalıştır <dosya>",
        "run-fail": "Dosya çalıştırılamadı.",
        "run-success": file => "Dosya çalıştırıldı: " + file,
        "command-not-found": args => "Komut bulunamadı: " + args[0].toLowerCase(),
        "command-run-line": "Satır"
    },
};

const readLine = ({show = true, arrowHandler = _ => _} = {}) => {
    return new Promise(resolve => {
        stdin.resume();
        let dat = "";
        const backspace = () => {
            if (dat.length > 0) {
                dat = dat.substring(0, dat.length - 1);
                if (show) process.stdout.write("\b \b");
            }
        };
        const rem = onStdinData(data => {
            const strData = data.toString();
            data = data.toString().split("").map(i => i.charCodeAt(0));
            if (data.length === 1 && data[0] === 3) return process.exit();
            let isKey = false;
            let isNormal = true;
            if (data.length === 1 && data[0] === 13) {
                stdin.pause();
                rem.remove();
                resolve(dat);
                isNormal = false;
            } else if (data.length === 1 && data[0] === 8) {
                backspace();
                isNormal = false;
            } else {
                if (data.length === 3 && data[0] === 27 && data[1] === 91) {
                    isKey = true;
                    // noinspection JSUnusedGlobalSymbols
                    const obj = {
                        backspace, dat: () => dat, clear: () => {
                            while (dat.length > 0) backspace();
                        }, type: str => {
                            dat += str;
                            process.stdout.write(str);
                        }
                    };
                    switch (data[2]) {
                        case 65:
                            arrowHandler("up", obj);
                            break;
                        case 68:
                            arrowHandler("left", obj);
                            break;
                        case 67:
                            arrowHandler("right", obj)
                            break;
                        case 66:
                            arrowHandler("down", obj);
                            break;
                        default:
                            isKey = false;
                            break;
                    }
                }
                if (!isKey) dat += strData;
            }
            if (show && !isKey && isNormal) process.stdout.write(strData);
        });
    });
};


const robot = require("robotjs");
const fs = require("fs");
const translate = (s, ...a) => typeof strings[CONFIG.lang][s] === "function" ? strings[CONFIG.lang][s](...a) : strings[CONFIG.lang][s];
const argv = process.argv.slice(2);
const params = {
    normal: [],
    params: {}
};
for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
        params.params[arg.substring(2)] = (argv[i + 1] || "").startsWith("--") ? true : (argv[i + 1] || true);
        i++;
    } else params.normal.push(arg);
}
if (params.params["responses"]) CONFIG.functionResponses = true;
CONFIG.lang = params.params["lang"] || CONFIG.lang;
const PROPS = [
    {
        name: translate("mouse-name"),
        run: async args => {
            switch (args[0]) {
                case translate("mouse-click"):
                    if (args.length !== 3) return translate("mouse-click-usage");
                    // noinspection JSNonASCIINames,NonAsciiCharacters
                    const m = {
                        [translate("mouse-click-left")]: "left",
                        [translate("mouse-click-right")]: "right",
                        [translate("mouse-click-middle")]: "middle"
                    };
                    // noinspection JSNonASCIINames,NonAsciiCharacters
                    const d = {
                        [translate("mouse-click-once")]: false,
                        [translate("mouse-click-double")]: true
                    };
                    args[1] = (args[1] || "").toLowerCase();
                    args[2] = (args[2] || "").toLowerCase();
                    if (!m[args[1]]) return translate("mouse-click-button", args);
                    if (d[args[2]] === undefined) return translate("mouse-click-type", args);
                    await robot.mouseClick(m[args[1]], d[args[2]]);
                    if (CONFIG.functionResponses) return translate("mouse-click-success");
                    return;
                default:
                    return translate("mouse-usage");
            }
        }
    },
    {
        name: translate("wait-name"),
        run: async args => {
            if (args.length !== 1) return translate("wait-usage");
            const n = args[0] * 1;
            if (isNaN(n)) return translate("wait-number", n);
            if (n < 0) return translate("wait-small");
            await new Promise(r => setTimeout(r, n * 1000));
            if (CONFIG.functionResponses) return translate("wait-success", n);
        },
    },
    {
        name: translate("goto-name"),
        run: async (args, {setLine, lines, lineIndex}) => {
            if (!setLine) return translate("goto-file");
            if (args.length !== 1) return translate("goto-usage");
            const to = args[0] * 1;
            if (isNaN(to)) return translate("goto-number", args);
            if (to !== Math.floor(to)) return translate("goto-integer", lines);
            if (to < 1) return translate("goto-negative");
            if (lineIndex === to - 1) return translate("goto-already", to);
            if (to > lines.length) return translate("goto-overflow", to);
            setLine(to - 2);
            if (CONFIG.functionResponses) return translate("goto-success", to);
        }
    },
    {
        name: translate("stop-name"),
        run: async (args) => {
            if (args.length !== 0) return translate("stop-usage");
            if (CONFIG.functionResponses) return translate("stop-success");
            process.exit();
        }
    },
    {
        name: translate("keyboard-name"),
        run: async args => {
            switch (args[0]) {
                case translate("keyboard-tap"):
                    if (args.length !== 2) return translate("keyboard-tap-usage");
                    try {
                        robot.keyTap(args[1]);
                    } catch (e) {
                        return translate("keyboard-tap-fail", args);
                    }
                    if (CONFIG.functionResponses) return translate("keyboard-tap-success", args);
                    return;
                case translate("keyboard-type"):
                    if (args.length < 2) return translate("keyboard-type-usage");
                    const t = args.slice(1).join(" ");
                    try {
                        robot.typeString(t);
                    } catch (e) {
                        return translate("keyboard-type-fail", t);
                    }
                    if (CONFIG.functionResponses) return translate("keyboard-type-success", t);
                    return;
                default:
                    return translate("keyboard-usage");
            }
        }
    },
    {
        name: translate("console-name"),
        run: async args => {
            switch (args[0]) {
                case translate("console-log"):
                    return args.slice(1).join(" ");
                case translate("console-clear"):
                    console.clear();
                    if (CONFIG.functionResponses) return translate("console-clear-success");
                    return;
                default:
                    return translate("console-usage");
            }
        }
    },
    {
        name: translate("run-name"),
        run: async args => {
            return await new Promise(async r => {
                const file = args[0];
                if (args.length !== 1) return r(translate("run-usage"));
                runFile(file)
                    .then(_ => {
                        if (CONFIG.functionResponses) r(translate("run-success", file));
                        else r();
                    })
                    .catch(_ => r(translate("run-fail")));
            });
        }
    }
];
const runCommand = async (lines, lineIndex, setLine = _ => _) => {
    const line = lines[lineIndex];
    const args = line.split(" ").map(i => i.trim()).filter(i => i);
    if (args[0]) {
        const cmd = PROPS.find(k => k.name === args[0].toLowerCase());
        if (cmd) {
            return await cmd.run(args.slice(1), {lineIndex, lines, setLine});
        } else return translate("command-not-found", args);
    }
};
let files = [];
const runFile = async file => {
    if (!files.includes(file)) files.push(file);
    if (!fs.existsSync(file) && !file.endsWith(".rjs")) file = file + ".rjs";
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const I = i;
        const res = await runCommand(lines, i, n => i = n);
        if (res) console.log((files.length > 1 || runType ? file + ": " : "") + translate("command-run-line") + " " + (I + 1) + ": " + res);
        await new Promise(r => setTimeout(r));
    }
};
const promptHistory = [];
let runType = 0;
const runPrompt = async () => {
    runType = 1;
    process.stdout.write("> ");
    let historyIndex = promptHistory.length;
    const startIndex = historyIndex;
    const line = await readLine({
        arrowHandler: (arr, {clear, type, dat}) => {
            const way = {up: -1, down: 1}[arr];
            if (!way) return;
            if (promptHistory[historyIndex + way] === undefined) return;
            if (historyIndex === startIndex) promptHistory[startIndex] = dat();
            historyIndex += way;
            clear();
            type(promptHistory[historyIndex]);
        },
    });
    process.stdout.write("\n");
    const res = await runCommand([line], 0, false);
    if (res) console.log(res);
    if (line.trim() && promptHistory[startIndex - 1] !== line) promptHistory[startIndex] = line;
    else promptHistory.splice(startIndex, 1);
    setTimeout(runPrompt);
};
if (params.normal[0]) {
    runFile(params.normal[0]).then(_ => process.exit());
    const waitForKill = async () => {
        await readLine({show: false});
        setTimeout(waitForKill);
    };
    waitForKill().then(_ => _);
} else runPrompt().then(_ => _);