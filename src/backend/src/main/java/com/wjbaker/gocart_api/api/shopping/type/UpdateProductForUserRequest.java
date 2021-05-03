package com.wjbaker.gocart_api.api.shopping.type;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class UpdateProductForUserRequest {

    private String tpnb;
    private int listQuantity;
    private int addCount;

    @JsonProperty("isChecked")
    private boolean isChecked;
}
