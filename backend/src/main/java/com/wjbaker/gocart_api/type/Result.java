package com.wjbaker.gocart_api.type;

public final class Result<T> {

    private final String error;
    private final T value;

    private Result(final T value, final String error) {
        this.value = value;
        this.error = error;
    }

    public static <T> Result<T> from(final T value) {
        return new Result<>(value, null);
    }

    public static <T> Result<T> error(final String error) {
        return new Result<>(null, error);
    }

    public boolean isError() {
        return this.error != null;
    }

    public T value() {
        return this.value;
    }

    public String getError() {
        return this.error;
    }
}
