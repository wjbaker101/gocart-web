package com.wjbaker.gocart_api.client.tesco.types;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public final class ShopSearchResponse {

    private List<Result> results;

    @Getter
    @Setter
    public static final class Result {

        private Location location;
        private DistanceFrom distanceFrom;

        @Getter
        @Setter
        public static final class Location {

            private String name;
            private Geo geo;
            private List<OpeningHour> openingHours;
            private List<Facility> facilities;

            @Getter
            @Setter
            public static final class Geo {

                private Coordinates coordinates;

                @Getter
                @Setter
                public static class Coordinates {

                    private double longitude;
                    private double latitude;
                }
            }

            @Getter
            @Setter
            public static final class OpeningHour {

                private String type;
                private StandardOpeningHours standardOpeningHours;
                private List<Exception> exceptions;

                @Getter
                @Setter
                public static final class StandardOpeningHours {

                    private Hours mo;
                    private Hours tu;
                    private Hours we;
                    private Hours th;
                    private Hours fr;
                    private Hours sa;
                    private Hours su;
                }

                @Getter
                @Setter
                public static final class Exception {

                    private String date;
                    private Hours hours;
                }

                @Getter
                @Setter
                public static final class Hours {

                    private String isOpen;
                    private String open;
                    private String close;
                }
            }

            @Getter
            @Setter
            public static final class Facility {

                private String description;
            }
        }

        @Getter
        @Setter
        public static final class DistanceFrom {

            private String unit;
            private float value;
        }
    }
}
