package com.wjbaker.gocart_api.api.shops.type;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public final class GetNearbyShopsResponseShop {

    private String name;
    private Distance distance;
    private List<String> facilities;
    private Location location;
    private OpeningHour openingHour;

    @Getter
    @Setter
    public static final class Distance {

        private String unit;
        private float value;
    }

    @Getter
    @Setter
    public static final class Location {

        private double longitude;
        private double latitude;
    }

    @Getter
    @Setter
    public static final class OpeningHour {

        private Hours mo;
        private Hours tu;
        private Hours we;
        private Hours th;
        private Hours fr;
        private Hours sa;
        private Hours su;

        @Getter
        @Setter
        public static final class Hours {

            private String isOpen;
            private String open;
            private String close;
        }
    }
}
