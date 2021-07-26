const start = () => {
  //   const lSystem = new LSystem(
  //     ["F"],
  //     { "+": -90, "-": +90 },
  //     "F",
  //     { F: "F+F-F-F+F" },
  //     "corner",
  //     10
  //   );
  //   const lSystem = new LSystem(
  //     ["F", "G"],
  //     { "+": 120, "-": -120 },
  //     "F-G-G",
  //     { F: "F-G+F+G-F", G: "GG" },
  //     "corner",
  //     10
  //   );
  //   const lSystem = new LSystem(
  //     ["A", "B"],
  //     { "+": 60, "-": -60 },
  //     "A",
  //     { A: "B-A-B", B: "A+B+A" },
  //     "corner",
  //     10
  //   );
  //   const lSystem = new LSystem(
  //     ["F", "G"],
  //     { "+": -90, "-": 90 },
  //     "F",
  //     { F: "F+G", G: "F-G" },
  //     "center",
  //     10
  //   );
  //   const lSystem = new LSystem(
  //     ["F", "G"],
  //     { "+": -25, "-": 25 },
  //     "X",
  //     { F: "FF", X: "F+[[X]-X]-F[-FX]+X" },
  //     "centerBottom",
  //     10
  //   );
  //   const lSystem = new LSystem(
  //     ["F", "G"],
  //     { "+": -25, "-": 25 },
  //     "FX",
  //     { F: "FF", X: "F+[-F-XF-X][+FF][--XF[+X]][++F-X]" },
  //     "centerBottom",
  //     10
  //   );
  const lSystem = new LSystem(
    ["F", "G"],
    { "+": -25, "-": 25 },
    "X",
    { F: "FX[FX[+XF]]", X: "FF[+XZ++X-F[+ZX]][-X++F-X]", Z: "[+F-X-F][++ZX]" },
    "centerBottom",
    40
  );

  const button = document.getElementById("generate");
  // lSystem.generateString()
  button.onclick = () => lSystem.generateString();
};

class LSystem {
  constructor(variables, constants, start, rules, startPosition, lineSize) {
    this.variables = variables;
    this.constants = constants;
    this.start = start;
    this.rules = rules;
    this.lineSize = lineSize;
    this.startPosition = startPosition;
    this.init();
  }
  init() {
    this.generatedTextContainerEl = document.getElementById(
      "generatedTextContainer"
    );
    this.string = this.start;
    this.generatedTextContainerEl.innerText = this.string;
    this.canvas = document.getElementById("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d");
    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.5, "cyan");
    gradient.addColorStop(1, "green");

    // Set the fill style and draw a rectangle
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  generateString() {
    let tempString = "";
    for (let j = 0; j < this.string.length; j++) {
      const char = this.string[j];
      if (this.rules[char]) {
        tempString += this.rules[char];
      } else {
        tempString += char;
      }
    }
    this.string = tempString;
    this.generatedTextContainerEl.innerText = this.string;
    this.draw();
  }
  draw() {
    console.log("drawing called");
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.startPosition === "center") {
      this.ctx.translate(this.canvas.width / 2, canvas.height / 2);
    } else if (this.startPosition === "centerBottom") {
      this.ctx.translate(this.canvas.width / 2, canvas.height - 10);
      this.ctx.rotate(-75 * (Math.PI / 180));
      this.lineSize = this.lineSize * 0.8;
      this.opacity = 1;
    } else {
      this.ctx.translate(10, canvas.height - 10);
    }
    this.ctx.beginPath();
    // this.lineSize = (this.canvas.height / (this.string.length / 2)) * 8
    for (let i = 0; i < this.string.length; i++) {
      const char = this.string.charAt(i);
      if (this.variables.indexOf(char) > -1) {
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.lineSize, 0);
        this.ctx.translate(this.lineSize, 0);
      } else if (char === "+" || char === "-") {
        this.ctx.rotate(this.constants[char] * (Math.PI / 180));
      } else if (char === "[") {
        this.ctx.save();
      } else if (char === "]") {
        this.ctx.restore();
      } else {
      }
    }
    this.ctx.strokeStyle = "#1a7802";

    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.resetTransform();
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.5, "cyan");
    gradient.addColorStop(1, "green");

    // Set the fill style and draw a rectangle
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.stroke();
  }
}

start();
