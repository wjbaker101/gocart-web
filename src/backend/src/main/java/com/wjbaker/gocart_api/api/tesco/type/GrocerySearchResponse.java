package com.wjbaker.gocart_api.api.tesco.type;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class GrocerySearchResponse {

    @Getter @Setter
    private UK uk;

    public static class UK {

        @Getter @Setter
        private GHS ghs;

        public static class GHS {

            @Getter @Setter
            private Products products;

            public static class Products {

                @Getter @Setter
                private List<Result> results;

                public static class Result {

                    @Getter @Setter
                    private String id;

                    @Getter @Setter
                    private int number;

                    @Getter @Setter
                    private String tpnb;

                    @Getter @Setter
                    private String name;

                    @Getter @Setter
                    private float price;

                    @Getter @Setter
                    @JsonProperty("image")
                    private String imageUrl;

                    @Getter @Setter
                    private List<String> description;

                    @Getter @Setter
                    private String department;

                    @Getter @Setter
                    private String superDepartment;

                    @Getter @Setter
                    @JsonProperty("ContentsMeasureType")
                    private String measurementType;

                    @Getter @Setter
                    @JsonProperty("UnitOfSale")
                    private int unitOfSale;

                    @Getter @Setter
                    @JsonProperty("AverageSellingUnitWeight")
                    private int averageSellingUnitWeight;

                    @Getter @Setter
                    @JsonProperty("UnitQuantity")
                    private String unitQuantity;

                    @Getter @Setter
                    @JsonProperty("ContentsQuantity")
                    private int contentsQuantity;

                    @Getter @Setter
                    @JsonProperty("unitprice")
                    private int pricePerUnit;
                }
            }
        }
    }
}
