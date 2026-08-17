package edu.mum.cs.cs425.arrayutil;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

public class ArrayReversorTest {

    @Test
    void testReverseArrayWithValidInput() {

        ArrayFlattenerService mockService =
                mock(ArrayFlattenerService.class);

        int[][] input = {
                {1, 3},
                {0},
                {4, 5, 9}
        };

        int[] flattened = {
                1, 3, 0, 4, 5, 9
        };

        when(mockService.flattenArray(input))
                .thenReturn(flattened);

        ArrayReversor arrayReversor =
                new ArrayReversor(mockService);

        int[] result =
                arrayReversor.reverseArray(input);

        int[] expected = {
                9, 5, 4, 0, 3, 1
        };

        assertArrayEquals(expected, result);

        verify(mockService).flattenArray(input);
    }

    @Test
    void testReverseArrayWithNullInput() {

        ArrayFlattenerService mockService =
                mock(ArrayFlattenerService.class);

        when(mockService.flattenArray(null))
                .thenReturn(null);

        ArrayReversor arrayReversor =
                new ArrayReversor(mockService);

        int[] result =
                arrayReversor.reverseArray(null);

        assertNull(result);

        verify(mockService).flattenArray(null);
    }
}