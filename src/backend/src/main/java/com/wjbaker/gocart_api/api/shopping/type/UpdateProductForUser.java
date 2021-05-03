package com.wjbaker.gocart_api.api.shopping.type;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class UpdateProductForUser {

    private int listQuantity;
    private boolean isChecked;
    private int addCount;
}
