package edu.mum.cs.cs425.arrayutil;

public class ArrayReversor {

    private final ArrayFlattenerService arrayFlattenerService;

    public ArrayReversor(ArrayFlattenerService arrayFlattenerService) {
        this.arrayFlattenerService = arrayFlattenerService;
    }

    public int[] reverseArray(int[][] input) {

        int[] flattenedArray =
                arrayFlattenerService.flattenArray(input);

        if (flattenedArray == null) {
            return null;
        }

        int[] reversedArray =
                new int[flattenedArray.length];

        for (int i = 0; i < flattenedArray.length; i++) {
            reversedArray[i] =
                    flattenedArray[flattenedArray.length - 1 - i];
        }

        return reversedArray;
    }
}