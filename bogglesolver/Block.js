class Block {
    constructor(value, row, col) {
        this.value = value;
        this.row = row;
        this.col = col;
        this.neighbors = {};
        this.visited = false;
    }

    setNeighbors() {

        for (let i = 0; i < 8; i += 1) {
            this.neighbors[i] = undefined;
        }

        for (let block of blocks) {

            if (this.row - block.row == 1) {
                if (this.col - block.col == 1) {
                    this.neighbors[0] = block;
                } else if (this.col == block.col) {
                    this.neighbors[1] = block;
                } else if (this.col - block.col == -1) {
                    this.neighbors[2] = block;
                }
            } else if (this.row == block.row) {
                if (this.col - block.col == -1) {
                    this.neighbors[3] = block;
                } else if (this.col - block.col == 1) {
                    this.neighbors[7] = block;
                }
            } else if (this.row - block.row == -1) {
                if (this.col - block.col == 1) {
                    this.neighbors[6] = block;
                } else if (this.col == block.col) {
                    this.neighbors[5] = block;
                } else if (this.col - block.col == -1) {
                    this.neighbors[4] = block;
                }
            }
        }
    }
}