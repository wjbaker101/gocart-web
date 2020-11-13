package com.wjbaker.gocart_api.tesco.type;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class StoreLocationResponse {

    @Getter @Setter
    private List<Result> results;

    public static class Result {

        @Getter @Setter
        private Location location;

        @Getter @Setter
        private DistanceFrom distanceFrom;

        public static class Location {

            @Getter @Setter
            private String id;

            @Getter @Setter
            private String name;

            @Getter @Setter
            private AltIds altIds;

            @Getter @Setter
            private Region region;

            @Getter @Setter
            private Contact contact;

            @Getter @Setter
            private Geo geo;

            @Getter @Setter
            private Classification classification;

            @Getter @Setter
            private Status status;

            @Getter @Setter
            private List<OpeningHour> openingHours;

            @Getter @Setter
            private List<Facility> facilities;

            public static class AltIds {

                @Getter @Setter
                private int branchNumber;
            }

            public static class Region {

                @Getter @Setter
                private String isoCountryCode;

                @Getter @Setter
                private String isoSubdivision;
            }

            public static class Contact {

                @Getter @Setter
                private Address address;

                @Getter @Setter
                private List<PhoneNumber> phoneNumbers;

                @Getter @Setter
                private CommunityChampion communityChampion;

                public static class Address {

                    @Getter @Setter
                    private List<Line> lines;

                    @Getter @Setter
                    private String town;

                    @Getter @Setter
                    private String postcode;

                    public static class Line {

                        @Getter @Setter
                        private int lineNumber;

                        @Getter @Setter
                        private String text;
                    }
                }

                public static class PhoneNumber {

                    @Getter @Setter
                    private String alias;

                    @Getter @Setter
                    private String number;
                }

                private static class CommunityChampion {

                    @Getter @Setter
                    private String communityChampion;
                }
            }

            public static class Geo {

                @Getter @Setter
                private Coordinates coordinates;

                public static class Coordinates {

                    @Getter @Setter
                    private double longitude;

                    @Getter @Setter
                    private double latitude;
                }
            }

            public static class Classification {

                @Getter @Setter
                private String type;

                @Getter @Setter
                private String category;
            }

            public static class Status {

                @Getter @Setter
                private String currentStatus;
            }

            public static class OpeningHour {

                @Getter @Setter
                private String type;

                @Getter @Setter
                private StandardOpeningHours standardOpeningHours;

                @Getter @Setter
                private List<Exception> exceptions;

                public static class Hours {

                    @Getter @Setter
                    private String isOpen;

                    @Getter @Setter
                    private String open;

                    @Getter @Setter
                    private String close;
                }

                public static class StandardOpeningHours {

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
                }

                public static class Exception {

                    @Getter @Setter
                    private String date;

                    @Getter @Setter
                    private Hours hours;
                }
            }

            public static class Facility {

                @Getter @Setter
                private String name;

                @Getter @Setter
                private List<String> tags;

                @Getter @Setter
                private String description;

                @Getter @Setter
                private List<OpeningHour> openingHours;
            }
        }

        public static class DistanceFrom {

            @Getter @Setter
            private String unit;

            @Getter @Setter
            private float value;
        }
    }
}
