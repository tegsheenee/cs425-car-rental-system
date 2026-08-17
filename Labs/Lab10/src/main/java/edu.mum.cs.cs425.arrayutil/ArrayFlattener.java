package edu.mum.cs.cs425.arrayutil;

import java.util.Arrays;

public class ArrayFlattener {

    public int[] flattenArray(int[][] input) {

        if (input == null) {
            return null;
        }

        return Arrays.stream(input)
                .flatMapToInt(Arrays::stream)
                .toArray();
    }
}