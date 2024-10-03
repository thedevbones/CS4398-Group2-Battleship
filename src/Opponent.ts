abstract class Opponent {
    private moves: number[][];

    abstract nextMove(): number[];
} export default Opponent;