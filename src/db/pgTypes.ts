import { types } from "pg"

// INT8 (BIGINT)
types.setTypeParser(20, val => Number(val))

// FLOAT8 / NUMERIC
types.setTypeParser(1700, val => Number(val))
