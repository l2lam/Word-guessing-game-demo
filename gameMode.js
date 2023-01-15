class GameMode{
    constructor(name, desc, bg, runFunction) {
        this.name = name;
        this.description = desc;
        this.bg = bg;
        this.runFunction = runFunction;
    }

    run() {
        background(this.bg, 100);
        this.runFunction();
    }
}