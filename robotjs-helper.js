const CONFIG = {
    functionResponses: false,
    lang: "en",
    errorCrash: false
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
        "console-print": "print",
        "console-clear": "clear",
        "console-clear-success": "Cleared console.",
        "console-usage": "Usage: console <log, print, clear>",
        "run-name": "run",
        "run-usage": "Usage: run <file>",
        "run-fail": "Failed to run file.",
        "run-success": file => "Successfully ran file: " + file,
        "command-not-found": args => "Command not found: " + args[0].toLowerCase(),
        "command-run-line": "Line",
        "visit-name": "visit",
        "visit-file": "Visit method can only be used in files.",
        "visit-usage": "Usage: visit <number>",
        "visit-number": args => "Invalid number: " + args[0],
        "visit-integer": lines => "Line number should be an integer between 1 and " + lines.length + ".",
        "visit-negative": "Line number should be positive.",
        "visit-already": to => "You are already at " + to + ". line.",
        "visit-overflow": to => to + ". line is out of the code.",
        "visit-success": to => "Visiting to " + to + ". line.",
        "lang-usage": () => "Usage: lang <" + Object.keys(strings).join(", ") + ">",
        "lang-invalid": args => "Language not found: " + args[0],
        "lang-success": args => "Language has been set to " + args[0] + ".",
        "var-name": "var",
        "var-usage": "Usage: var <variable> <value>",
        "var-invalid": args => "Invalid variable name: " + args[0],
        "var-success": "Variable has been set.",
        "global-name": "global",
        "global-usage": "Usage: global <variable> <value>",
        "global-invalid": args => "Invalid global variable name: " + args[0],
        "global-success": "Global variable has been set.",
        "input-name": "input",
        "input-usage": "Usage: input <variable> <local, global>",
        "input-local": "local",
        "input-global": "global",
        "input-type": args => "Invalid type: " + args[1] + ", you have to use one of these: local, global",
        "input-invalid": args => "Invalid " + (args[1] === "local" ? "" : "global ") + "variable name: " + args[0],
        "input-success": "Line has been read.",
        "if-name": "if",
        "if-usage": "Usage: if <variable> <operator> <variable> <code>",
        "if-operator": args => "Invalid operator: " + args[1] + ", you have to use one of these: = != > < <= =< >= =>",
        "if-invalid-1": args => "Invalid variable name: " + args[0],
        "if-invalid-2": args => "Invalid variable name: " + args[2],
        "if-var-1": args => "Variable not found: " + args[0],
        "if-var-2": args => "Variable not found: " + args[2],
        "if-success": "If statement has been ran.",
        "if-fail": "If statement failed.",
        "config-name": "config",
        "config-usage": "Usage: config <" + Object.keys(CONFIG).join(", ") + "> <value>",
        "config-invalid": args => "Invalid property: " + args[0] + ", you have to use one of these: " + Object.keys(CONFIG).join(", "),
        "config-bool": args => "Invalid boolean: " + args[1] + ", you have to use one of these: true, false",
        "config-number": args => "Invalid number: " + args[1],
        "config-type": type => "Sorry, you cannot edit this property because of its type: " + type,
        "config-success": args => "Config property '" + args[0] + "' has been set to '" + args[1] + "'",
        "save-name": "save",
        "save-set-name": "set",
        "save-set-usage": "Usage: save set <variable> <value>",
        "save-set-file": "Save file hasn't been set yet. Use save file function to set it.",
        "save-set-success": args => "Variable '" + args[1] + "' has been set to '" + args[2] + "' for file '" + saves._file + "'.",
        "save-file-name": "file",
        "save-file-usage": "Usage: save file <file>",
        "save-file-success": args => "Save file has been set to " + args[1],
        "save-usage": "Usage: save <set, file>",
        "variable-not-found": name => "Variable not found: " + name,
        "save-not-found": all => "Save variable not found: " + all.slice(1).join(" ") + " in file " + all[0],
        "math-number": (a, operator, b) => "Result won't be a number: " + a + operator + b,
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
        "console-log": "kayıt",
        "console-print": "yaz",
        "console-clear": "temizle",
        "console-clear-success": "Konsol temizlendi.",
        "console-usage": "Kullanım: konsol <kayıt, yaz, temizle>",
        "run-name": "çalıştır",
        "run-usage": "Kullanım: çalıştır <dosya>",
        "run-fail": "Dosya çalıştırılamadı.",
        "run-success": file => "Dosya çalıştırıldı: " + file,
        "command-not-found": args => "Komut bulunamadı: " + args[0].toLowerCase(),
        "command-run-line": "Satır",
        "visit-name": "bak",
        "visit-file": "Bak fonksiyonu sadece dosyalarda kullanılabilir.",
        "visit-usage": "Kullanım: bak <sayı>",
        "visit-number": args => "Geçersiz sayı: " + args[0],
        "visit-integer": lines => "Satır sayısı 1 ile " + lines.length + " arasındaki bir doğal sayı olmalı.",
        "visit-negative": "Satır sayısı birden küçük olamaz.",
        "visit-already": to => "Zaten " + to + ". satırdasın.",
        "visit-overflow": to => to + ". satır kodun dışına çıkıyor.",
        "visit-success": to => to + ". satıra bakılıyor.",
        "lang-usage": () => "Kullanım: lang <" + Object.keys(strings).join(", ") + ">",
        "lang-invalid": args => "Dil bulunamadı: " + args[0],
        "lang-success": args => "Dil başarıyla " + args[0] + " olarak ayarlandı.",
        "var-name": "değişken",
        "var-usage": "Kullanım: değişken <değişken> <değer>",
        "var-invalid": args => "Geçersiz değişken adı: " + args[0],
        "var-success": "Değişken ayarlandı.",
        "global-name": "global",
        "global-usage": "Kullanım: global <değişken> <değer>",
        "global-invalid": args => "Geçersiz global değişken adı: " + args[0],
        "global-success": "Global değişken ayarlandı.",
        "input-name": "oku",
        "input-usage": "Kullanım: oku <değişken> <yerel, global>",
        "input-local": "yerel",
        "input-global": "global",
        "input-type": args => "Geçersiz tür: " + args[1] + ", şunlardan birini kullanmanız gerek: yerel, global",
        "input-invalid": args => "Geçersiz " + (args[1] === "yerel" ? "" : "global ") + "değişken adı: " + args[0],
        "input-success": "Satır okundu.",
        "if-name": "eğer",
        "if-usage": "Kullanım: eğer <değişken> <operatör> <değişken> <kod>",
        "if-operator": args => "Geçersiz operatör: " + args[1] + ", şunlardan birini kullanmanız gerek: = != > < <= =< >= =>",
        "if-invalid-1": args => "Geçersiz değişken adı: " + args[0],
        "if-invalid-2": args => "Geçersiz değişken adı: " + args[2],
        "if-var-1": args => "Değişken bulunamadı: " + args[0],
        "if-var-2": args => "Değişken bulunamadı: " + args[2],
        "if-success": "Eğer durumu çalıştırıldı.",
        "if-fail": "Eğer durumu başarısız.",
        "config-name": "ayarlar",
        "config-usage": "Kullanım: ayarlar <" + Object.keys(CONFIG).join(", ") + "> <değer>",
        "config-invalid": args => "Geçersiz ayar: " + args[0] + ", şunlardan birini kullanmanız gerek: " + Object.keys(CONFIG).join(", "),
        "config-bool": args => "Geçersiz mantıksal değer: " + args[1] + ", şunlardan birini kullanmanız gerek: true, false",
        "config-number": args => "Geçersiz sayı: " + args[1],
        "config-type": type => "Üzgünüm, bu ayarı türü yüzünden değiştiremezsin: " + type,
        "config-success": args => "'" + args[0] + "' ayarı '" + args[1] + "' olarak ayarlandı.",
        "save-name": "kayıt",
        "save-set-name": "ayarla",
        "save-set-usage": "Kullanım: kayıt ayarla <değişken> <değer>",
        "save-set-file": "Kayıt dosyası ayarlanmamış. Kayıt dosya fonksiyonuyla dosyayı ayarla.",
        "save-set-success": args => "'" + args[1] + "' değişkeni '" + saves._file + "' dosyası için '" + args[2] + "' olarak ayarlandı.",
        "save-file-name": "dosya",
        "save-file-usage": "Kullanım: kayıt dosya <dosya>",
        "save-file-success": args => "Kayıt dosyası " + args[1] + " olarak ayarlandı.",
        "save-usage": "Kullanım: kayıt <ayarla, dosya>",
        "variable-not-found": name => "Değişken bulunamadı: " + name,
        "save-not-found": all => all[0] + " dosyasındaki kayıt değişkeni bulunamadı: " + all.slice(1).join(" "),
        "math-number": (a, operator, b) => "Sonuç bir sayı olmayacak: " + a + operator + b,
    },
};
stdin.resume();
const readLine = ({show = true, arrowHandler = _ => _} = {}) => {
    return new Promise(resolve => {
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
        if (!(argv[i + 1] || "").startsWith("--")) i++;
    } else params.normal.push(arg);
}
if (params.params["responses"]) CONFIG.functionResponses = true;
if (params.params["error-crash"]) CONFIG.errorCrash = true;
CONFIG.lang = params.params["lang"] || CONFIG.lang;

const respond = {
    error: str => ({
        type: "error",
        text: str
    }),
    errorStack: list => ({
        type: "errorStack",
        list
    }),
    success: str => ({
        type: "success",
        text: str
    }),
    log: str => ({
        type: "log",
        text: str
    }),
    print: str => ({
        type: "print",
        text: str
    }),
    none: undefined
};

const variableRegex = /^[a-zA-Z_][a-zA-Z\d_]*$/;
const saves = {
    _file: null,
    set(file, variable, value) {
        const json = saves.json(file);
        if (!json) return;
        json[variable] = value;
        fs.writeFileSync(saves._file, JSON.stringify(json));
        return true;
    },
    get(file, variable) {
        const json = saves.json(file);
        if (!json) return;
        return json[variable];
    },
    exists(file, variable) {
        const json = saves.json(file);
        if (!json) return;
        return Object.keys(json).includes(variable);
    },
    json(file) {
        if (fs.existsSync(file) && !fs.statSync(file).isFile()) return;
        if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");
        return JSON.parse(fs.readFileSync(file, "utf8"));
    },
    file(file) {
        return saves._file = file;
    },
};

const PROPS = [
    {
        name: () => translate("mouse-name"),
        run: async args => {
            switch (args[0]) {
                case translate("mouse-click"):
                    if (args.length !== 3) return respond.error(translate("mouse-click-usage"));
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
                    if (!m[args[1]]) return respond.error(translate("mouse-click-button", args));
                    if (d[args[2]] === undefined) return respond.error(translate("mouse-click-type", args));
                    await robot.mouseClick(m[args[1]], d[args[2]]);
                    if (CONFIG.functionResponses) return respond.success(translate("mouse-click-success"));
                    return;
                default:
                    return respond.error(translate("mouse-usage"));
            }
        }
    },
    {
        name: () => translate("wait-name"),
        run: async args => {
            if (args.length !== 1) return respond.error(translate("wait-usage"));
            const n = args[0] * 1;
            if (isNaN(n)) return respond.error(translate("wait-number", n));
            if (n < 0) return respond.error(translate("wait-small"));
            await new Promise(r => setTimeout(r, n * 1000));
            if (CONFIG.functionResponses) return respond.success(translate("wait-success", n));
        },
    },
    {
        name: () => translate("goto-name"),
        run: async (args, {setLine, lines, lineIndex}) => {
            if (!setLine) return respond.error(translate("goto-file"));
            if (args.length !== 1) return respond.error(translate("goto-usage"));
            const to = args[0] * 1;
            if (isNaN(to)) return respond.error(translate("goto-number", args));
            if (to !== Math.floor(to)) return respond.error(translate("goto-integer", lines));
            if (to < 1) return respond.error(translate("goto-negative"));
            if (lineIndex === to - 1) return respond.error(translate("goto-already", to));
            if (to > lines.length) return respond.error(translate("goto-overflow", to));
            setLine(to - 2);
            if (CONFIG.functionResponses) return respond.success(translate("goto-success", to));
        }
    },
    {
        name: () => translate("visit-name"),
        run: async (args, {visitLine, lines, lineIndex}) => {
            if (!visitLine) return respond.error(translate("visit-file"));
            if (args.length !== 1) return respond.error(translate("visit-usage"));
            const to = args[0] * 1;
            if (isNaN(to)) return respond.error(translate("visit-number", args));
            if (to !== Math.floor(to)) return respond.error(translate("visit-integer", lines));
            if (to < 1) return respond.error(translate("visit-negative"));
            if (lineIndex === to - 1) return respond.error(translate("visit-already", to));
            if (to > lines.length) return respond.error(translate("visit-overflow", to));
            await visitLine(to - 1);
            if (CONFIG.functionResponses) return respond.success(translate("visit-success", to));
        }
    },
    {
        name: () => translate("stop-name"),
        run: async (args) => {
            if (args.length !== 0) return respond.error(translate("stop-usage"));
            if (CONFIG.functionResponses) return respond.success(translate("stop-success"));
            process.exit();
        }
    },
    {
        name: () => translate("keyboard-name"),
        run: async args => {
            switch (args[0]) {
                case translate("keyboard-tap"):
                    if (args.length !== 2) return respond.error(translate("keyboard-tap-usage"));
                    try {
                        robot.keyTap(args[1]);
                    } catch (e) {
                        return respond.error(translate("keyboard-tap-fail", args));
                    }
                    if (CONFIG.functionResponses) return respond.success(translate("keyboard-tap-success", args));
                    return;
                case translate("keyboard-type"):
                    if (args.length < 2) return respond.error(translate("keyboard-type-usage"));
                    const t = args.slice(1).join(" ");
                    try {
                        robot.typeString(t);
                    } catch (e) {
                        return respond.error(translate("keyboard-type-fail", t));
                    }
                    if (CONFIG.functionResponses) return respond.success(translate("keyboard-type-success", t));
                    return;
                default:
                    return respond.error(translate("keyboard-usage"));
            }
        }
    },
    {
        name: () => translate("console-name"),
        run: async args => {
            switch (args[0]) {
                case translate("console-log"):
                    return respond.log(args.slice(1).join(" "));
                case translate("console-print"):
                    return respond.print(args.slice(1).join(" "));
                case translate("console-clear"):
                    console.clear();
                    if (CONFIG.functionResponses) return respond.success(translate("console-clear-success"));
                    return;
                default:
                    return respond.error(translate("console-usage"));
            }
        }
    },
    {
        name: () => translate("run-name"),
        run: async args => {
            return await new Promise(async r => {
                const file = args[0];
                if (args.length !== 1) return respond.error(r(translate("run-usage")));
                runFile(file)
                    .then(_ => {
                        if (CONFIG.functionResponses) r(respond.success(translate("run-success", file)));
                        else r();
                    })
                    .catch(_ => r(respond.error(translate("run-fail"))));
            });
        }
    },
    {
        name: () => "lang",
        run: async args => {
            if (args.length !== 1) return respond.error(translate("lang-usage"));
            if (!strings[args[0]]) return respond.error(translate("lang-invalid", args));
            CONFIG.lang = args[0];
            if (CONFIG.functionResponses) return respond.error(translate("lang-success", args));
        }
    },
    {
        name: () => translate("config-name"),
        run: async args => {
            if (args.length < 2) return respond.error(translate("config-usage"));
            if (Object.keys(CONFIG).includes(args[0])) return respond.error(translate("config-invalid", args));
            switch (typeof CONFIG[args[0]]) {
                case "boolean":
                    if (!["true", "false"].includes(args[1])) return respond.error(translate("config-bool", args));
                    args[1] = args[1] === "true";
                    break;
                case "string":
                    break;
                case "number":
                    args[1] *= 1;
                    if (isNaN(args[1])) return respond.error(translate("config-number", args))
                    break;
                default:
                    return respond.error(translate("config-type", typeof CONFIG[args[0]]))
            }
            CONFIG[args[0]] = args[1];
            if (CONFIG.functionResponses) return respond.error(translate("config-success", args));
        }
    },
    {
        name: () => translate("var-name"),
        run: async (args, {file, fileId}) => {
            if (args.length < 2) return respond.error(translate("var-usage"));
            if (!variableRegex.test(args[0])) return respond.error(translate("var-invalid", args));
            if (args.length === 2 && !isNaN(args[1] * 1)) args[1] = args[1] * 1;
            (file ? variables.file[fileId] : variables.local)[args[0]] = typeof args[1] === "number" ? args[1] : args.slice(1).join(" ");
            if (CONFIG.functionResponses) return respond.error(translate("var-success", args));
        }
    },
    {
        name: () => translate("global-name"),
        run: async args => {
            if (args.length < 2) return respond.error(translate("global-usage"));
            if (!variableRegex.test(args[0])) return respond.error(translate("global-invalid", args));
            if (args.length === 2 && !isNaN(args[1] * 1)) args[1] = args[1] * 1;
            variables.global[args[0]] = args[1];
            if (CONFIG.functionResponses) return respond.error(translate("global-success", args));
        }
    },
    {
        name: () => translate("input-name"),
        run: async (args, {file, fileId}) => {
            if (args.length < 2) return respond.error(translate("input-usage"));
            const t = {
                [translate("input-local")]: file ? variables.file[fileId] : variables.local,
                [translate("input-global")]: variables.global
            };
            if (!t[args[1]]) return respond.error(translate("input-type"));
            if (!variableRegex.test(args[0])) return respond.error(translate("input-invalid", args));
            t[args[1]][args[0]] = await readLine();
            process.stdout.write("\n");
            if (CONFIG.functionResponses) return respond.error(translate("input-success", args));
        }
    },
    {
        name: () => translate("if-name"),
        run: async (args, {file, fileId, setLine, visitLine, lineIndex}) => {
            if (args.length < 4) return respond.error(translate("if-usage"));
            if (![..."=<>", "<=", ">=", "=>", "=<", "!="].includes(args[1])) return respond.error(translate("if-operator", args));
            if (!variableRegex.test(args[0])) return respond.error(translate("if-invalid-1", args));
            if (!variableRegex.test(args[2])) return respond.error(translate("if-invalid-2", args));
            const local = file ? variables.file[fileId] : variables.local;
            const get = str => local[str] || variables.global[str];
            let a = get(args[0]);
            let b = get(args[2]);
            if (a === undefined) return respond.error(translate("if-var-1", args));
            if (b === undefined) return respond.error(translate("if-var-2", args));
            a += "";
            b += "";
            let statement;
            if (!isNaN(a * 1) && !isNaN(b * 1)) {
                a *= 1;
                b *= 1;
            }
            switch (args[1]) {
                case "=":
                    statement = a === b;
                    break;
                case "!=":
                    statement = a !== b;
                    break;
                case "<":
                    statement = a < b;
                    break;
                case ">":
                    statement = a > b;
                    break;
                case "<=":
                case "=<":
                    statement = a <= b;
                    break;
                case ">=":
                case "=>":
                    statement = a >= b;
                    break;
            }
            if (statement) {
                const lines = new Array(lineIndex + 1).fill("");
                lines[lineIndex] = args.slice(3).join(" ");
                const res = await runCommand({
                    lines, lineIndex, setLine, visitLine, file, fileId
                });
                convertResponse(res);
            }
            if (CONFIG.functionResponses) return respond.error(translate("if-" + (statement ? "success" : "fail"), args));
        }
    },
    {
        name: () => translate("save-name"),
        run: async args => {
            switch (args[0]) {
                case translate("save-set-name"):
                    if (args.length < 3) return respond.error(translate("save-set-usage"));
                    if (!saves._file) return respond.error(translate("save-set-file"));
                    saves.set(saves._file, args[1], args.slice(2).join(" "));
                    if (CONFIG.functionResponses) return respond.error(translate("save-set-success", args));
                    break;
                case translate("save-file-name"):
                    if (args.length !== 2) return respond.error(translate("save-file-usage"));
                    saves.file(args[1]);
                    if (CONFIG.functionResponses) return respond.error(translate("save-file-success", args));
                    break;
                default:
                    return respond.error(translate("save-usage"));
            }
        }
    },
];
const variables = {
    /*** @type {Object<string, string|number>} */
    global: {},
    /*** @type {Object<number, Object<string, string|number>>} */
    file: {},
    /*** @type {Object<string, string|number>} */
    local: {}
};
let mainFile = null;
/**
 * @param {string[]} lines
 * @param {number} lineIndex
 * @param {Function | false} setLine
 * @param {Function | false} visitLine
 * @param {string?} file
 * @param {number?} fileId
 * @returns {Promise}
 */
const runCommand = async ({
                              lines, lineIndex, setLine = false,
                              visitLine = false, file, fileId
                          }) => {
    let line = lines[lineIndex].split(" ").map(i => i.trim()).filter(i => i).join(" ");
    const varRegex = /%var [a-zA-Z_][a-zA-Z\d_]*%/g;
    const saveRegex = /%save .+ .+%/g;
    const emptyRegex = /%%/g;
    const lineRegex = /%\\n%/g;
    const spaceRegex = /% %/g;
    const percentRegex = /%%%/g;
    const piRegex = /%pi%/g;
    const eRegex = /%e%/g;
    const repeatRegex = /%repeat -?(\d+|\d*\.\d+) [^%]+%/g;
    const mathRegex = /%math -?(\d+|\d*\.\d+)([+\-*/]|\*\*)-?(\d+|\d*\.\d+)%/g;
    const joinRegex = /%join( -?(\d+|\d*\.\d+)){2,}%/g;
    const maxRegex = /%max( -?(\d+|\d*\.\d+)){2,}%/g;
    const minRegex = /%min( -?(\d+|\d*\.\d+)){2,}%/g;
    const randRegex = /%rand%/g;
    const randomRegex = /%random -?\d+ -?\d+%/g;
    const randomFloatRegex = /%randomf -?\d+ -?\d+ \d+%/g;
    // start

    let errors = [];
    line = line.replaceAll(varRegex, match => {
        if (errors.length) return;
        const name = match.substring(5, match.length - 1);
        const local = file ? variables.file[fileId] : variables.local;
        const found = local[name] || variables.global[name];
        if (!found) return errors.push(translate("variable-not-found", name));
        return found;
    });
    if (errors.length) return respond.errorStack(errors);
    line = line.replaceAll(saveRegex, match => {
        if (errors.length) return;
        const all = match.substring(6, match.length - 1).split(" ");
        if (saves.exists(all[0], all.slice(1).join(" "))) return saves.get(all[0], all.slice(1).join(" "));
        return errors.push(translate("save-not-found", all));
    });
    if (errors.length) return respond.errorStack(errors);
    line = line.replaceAll(piRegex, Math.PI.toString());
    line = line.replaceAll(eRegex, Math.E.toString());
    line = line.replaceAll(randRegex, _ => Math.random() + "");
    [
        "sqrt", "abs", "floor", "ceil", "round", "sin", "cos", "tan", "trunc", "log1p", "exp", "sign", "acos",
        "acosh", "asin", "asinh", "atan", "atanh", "cbrt", "clz32", "cosh", "expm1", "fround", "log", "log2",
        "log1p", "log10"
    ].forEach(name => {
        line = line.replaceAll(new RegExp("%" + name + " -?(\\d+|\\d*\\.\\d+)%", "g"), match => {
            if (errors.length) return;
            const all = match.substring(name.length + 2, match.length - 1);
            return Math[name](all * 1) + "";
        });
    });
    const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
    line = line.replaceAll(randomRegex, match => {
        const all = match.substring(8, match.length - 1);
        return random(...all.split(" ").map(Number));
    });
    line = line.replaceAll(randomFloatRegex, match => {
        const all = match.substring(9, match.length - 1);
        const numbers = all.split(" ").map(Number);
        const depth = 10 ** numbers[2];
        return random(numbers[0] * depth, numbers[1] * depth) / depth;
    });
    line = line.replaceAll(joinRegex, match => {
        const all = match.substring(6, match.length - 1);
        return all.split(" ").join("");
    });
    line = line.replaceAll(minRegex, match => {
        const all = match.substring(5, match.length - 1);
        return Math.min(...all.split(" ").map(Number)) + "";
    });
    line = line.replaceAll(maxRegex, match => {
        const all = match.substring(5, match.length - 1);
        return Math.max(...all.split(" ").map(Number)) + "";
    });
    line = line.replaceAll(mathRegex, match => {
        if (errors.length) return;
        const all = match.substring(6, match.length - 1);
        let first = "";
        let operator = "";
        let i = -1;
        const l = [..."+-*/"];
        while (!l.includes(all[++i])) first += all[i];
        while (l.includes(all[i])) operator += all[i++];
        let a = first;
        let b = all.substring(i);
        let res;
        switch (operator) {
            case "+":
                if (!isNaN(a * 1) && !isNaN(b * 1)) {
                    a *= 1;
                    b *= 1;
                }
                res = a + b;
                break;
            case "-":
                res = a - b;
                break;
            case "*":
                res = a * b;
                break;
            case "/":
                res = a / b;
                break;
            case "**":
                res = a ** b;
                break;
        }
        if (res === undefined || isNaN(res)) return errors.push(translate("math-number", a, operator, b));
        return res;
    });
    if (errors.length) return respond.errorStack(errors);
    line = line.replaceAll(repeatRegex, match => {
        if (errors.length) return;
        const all = match.substring(8, match.length - 1);
        const number = Math.floor(all.split(" ")[0] * 1);
        const str = all.split(" ").slice(1).join(" ");
        return str.repeat(number < 0 ? 0 : number);
    });
    line = line.replaceAll(lineRegex, "\n");
    line = line.replaceAll(spaceRegex, " ");

    // end
    line = line.replaceAll(emptyRegex, "");
    line = line.replaceAll(percentRegex, "%");
    const args = line.split(" ");
    if (args[0]) {
        const cmd = PROPS.find(k => k.name() === args[0].toLowerCase());
        if (cmd) {
            return await cmd.run(args.slice(1), {lineIndex, lines, setLine, visitLine, file, fileId});
        } else return respond.error(translate("command-not-found", args));
    }
};
let files = [];
const convertResponse = (res, file, I) => {
    if (res) {
        if (!file && res.type === "print") res.type = "log";
        switch (res.type) {
            case "errorStack":
                res.list.forEach(i => convertResponse({type: "error", text: i}, file, I));
                break;
            case "error":
            case "success":
                console.info(((files.length > 1 || runType) && file ? file + ": " : "") + (I !== undefined ? translate("command-run-line") + " " + (I + 1) + ": " : "") + res.text);
                if (res.type === "error" && CONFIG.errorCrash) process.exit();
                break;
            case "log":
                console.info(res.text);
                break;
            case "print":
                process.stdout.write(res.text);
                break;
        }
    }
};
let _f_id = 0;
const runFile = async (file, direct = false) => {
    if (!files.includes(file)) files.push(file);
    const isValidFile = file => fs.existsSync(file) && fs.statSync(file).isFile();
    if (!isValidFile(file) && !file.endsWith(".rjs")) file = file + ".rjs";
    if (!isValidFile(file) && direct) return console.error("Couldn't find the file: " + file);
    const content = fs.readFileSync(file, "utf8");
    const fileId = _f_id++;
    variables.file[fileId] = {};
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const I = i;
        const visitLine = n => runCommand({lines, lineIndex: n, setLine: n => i = n, visitLine, file, fileId});
        const res = await runCommand({lines, lineIndex: i, setLine: n => i = n, visitLine, file, fileId});
        convertResponse(res, file, I);
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
    const res = await runCommand({lines: [line], lineIndex: 0});
    convertResponse(res);
    if (line.trim() && promptHistory[startIndex - 1] !== line) promptHistory[startIndex] = line;
    else promptHistory.splice(startIndex, 1);
    setTimeout(runPrompt);
};
if (params.normal[0]) {
    mainFile = params.normal[0];
    runFile(params.normal[0], true).then(_ => process.exit());
} else runPrompt().then(_ => _);
const waitForKill = async () => {
    await readLine({show: false});
    setTimeout(waitForKill);
};
waitForKill().then(_ => _);