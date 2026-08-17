package edu.mum.cs.cs425.arrayutil;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ArrayFlattenerTest {

    private final ArrayFlattener arrayFlattener =
            new ArrayFlattener();

    @Test
    void testFlattenArrayWithValidInput() {

        int[][] input = {
                {1, 3},
                {0},
                {4, 5, 9}
        };

        int[] expected = {
                1, 3, 0, 4, 5, 9
        };

        int[] actual =
                arrayFlattener.flattenArray(input);

        assertArrayEquals(expected, actual);
    }

    @Test
    void testFlattenArrayWithNullInput() {

        int[] actual =
                arrayFlattener.flattenArray(null);

        assertNull(actual);
    }
}