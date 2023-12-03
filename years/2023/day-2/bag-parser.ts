export type Cubes = {
  red: number;
  blue: number;
  green: number;
};

type Game = {
  id: number;
  gameBag: Cubes;
};

export const parseGameReports = (gameReports: string[]): Game[] =>
  gameReports.map((report, index) => {
    const id = index + 1;
    const gameBag = {
      red: 0,
      blue: 0,
      green: 0,
    };

    const rounds = report
      .split(": ")[1]
      .split("; ")
      .map((round) => round.split(", "));

    for (const round of rounds) {
      const drawBag = {
        red: 0,
        blue: 0,
        green: 0,
      };
      for (const draw of round) {
        const [amount, color] = draw.split(" ");

        if (color === "red" && drawBag.red < Number(amount)) {
          drawBag.red += Number(amount);
        }

        if (color === "blue" && drawBag.blue < Number(amount)) {
          drawBag.blue += Number(amount);
        }

        if (color === "green" && drawBag.green < Number(amount)) {
          drawBag.green += Number(amount);
        }
      }

      if (drawBag.red > gameBag.red) {
        gameBag.red = drawBag.red;
      }

      if (drawBag.blue > gameBag.blue) {
        gameBag.blue = drawBag.blue;
      }

      if (drawBag.green > gameBag.green) {
        gameBag.green = drawBag.green;
      }
    }

    return {
      id,
      gameBag,
    };
  });
