package com.wjbaker.gocart_api.client.tesco.types;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public final class GrocerySearchResponse {

    private Uk uk;

    @Getter
    @Setter
    public static final class Uk {

        private Ghs ghs;

        @Getter
        @Setter
        public static final class Ghs {

            private Products products;

            @Getter
            @Setter
            public static final class Products {

                private List<Result> results;

                @Getter
                @Setter
                public static final class Result {

                    private String id;
                    private int number;
                    private String tpnb;
                    private String name;
                    private float price;
                    @JsonProperty("image") private String imageUrl;
                    private List<String> description;
                    private String department;
                    private String superDepartment;
                    @JsonProperty("ContentsMeasureType") private String measurementType;
                    @JsonProperty("UnitOfSale") private int unitOfSale;
                    @JsonProperty("AverageSellingUnitWeight") private int averageSellingUnitWeight;
                    @JsonProperty("UnitQuantity") private String unitQuantity;
                    @JsonProperty("ContentsQuantity") private int contentsQuantity;
                    @JsonProperty("unitprice") private int pricePerUnit;
                }
            }
        }
    }
}
