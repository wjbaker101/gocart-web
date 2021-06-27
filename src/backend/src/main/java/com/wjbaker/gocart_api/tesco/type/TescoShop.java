package com.wjbaker.gocart_api.tesco.type;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
public class TescoShop {

    @Getter @Setter
    private String name;

    @Getter @Setter
    private Distance distance;

    @Getter @Setter
    private List<String> facilities;

    @Getter @Setter
    private Location location;

    @Getter @Setter
    private OpeningHour openingHour;

    @Builder
    public static class Distance {

        @Getter @Setter
        private String unit;

        @Getter @Setter
        private float value;
    }

    @Builder
    public static class Location {

        @Getter @Setter
        private double longitude;

        @Getter @Setter
        private double latitude;
    }

    @Builder
    public static class OpeningHour {

        @Getter @Setter
        private Hours mo;

        @Getter @Setter
        private Hours tu;

        @Getter @Setter
        private Hours we;

        @Getter @Setter
        private Hours th;

        @Getter @Setter
        private Hours fr;

        @Getter @Setter
        private Hours sa;

        @Getter @Setter
        private Hours su;

        @Builder
        public static class Hours {

            @Getter @Setter
            private String isOpen;

            @Getter @Setter
            private String open;

            @Getter @Setter
            private String close;
        }
    }
}
