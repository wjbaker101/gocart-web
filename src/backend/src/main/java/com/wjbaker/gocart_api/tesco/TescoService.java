package com.wjbaker.gocart_api.tesco;

import com.wjbaker.gocart_api.client.tesco.TescoClient;
import com.wjbaker.gocart_api.client.tesco.types.ShopSearchResponse;
import com.wjbaker.gocart_api.tesco.mapper.SearchProductsMapper;
import com.wjbaker.gocart_api.tesco.type.GetNearbyShopsResponseShop;
import com.wjbaker.gocart_api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.tesco.type.TescoProduct;
import com.wjbaker.gocart_api.type.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TescoService {

    private final TescoApiClient tescoApiClient;
    private final TescoClient tescoClient;
    private final MissingProductDataService missingProductDataService;

    @Autowired
    public TescoService(
        final TescoApiClient tescoApiClient,
        final TescoClient tescoClient,
        final MissingProductDataService missingProductDataService) {

        this.tescoApiClient = tescoApiClient;
        this.tescoClient = tescoClient;
        this.missingProductDataService = missingProductDataService;
    }

    public List<SearchProduct> searchProducts(final String searchTerm, final int page) {
        var response = Optional.ofNullable(this.tescoApiClient.grocerySearch(searchTerm, page - 1).getBody());

        if (response.isEmpty())
            return null;

        var productData = this.productDataList(response.get()
                .stream()
                .map(SearchProduct::getId)
                .collect(Collectors.toList()));

        return response.map(res -> res
                .stream()
                .map(product -> SearchProductsMapper.mapWithProduct(product, productData
                        .stream()
                        .filter(p -> product.getId().equals(p.getId()))
                        .findFirst()
                        .orElse(null)))
                .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    public Result<List<GetNearbyShopsResponseShop>> getNearbyShops(final String searchTerm) {
        var shopSearchResult = this.tescoClient.shopSearch(searchTerm);
        if (shopSearchResult.isError())
            return Result.from(null);

        var shopResults = shopSearchResult.value().getResults();

        var shops = new ArrayList<GetNearbyShopsResponseShop>(shopResults.size());
        for (var shopResult : shopResults) {
            var shop = new GetNearbyShopsResponseShop();
            if (shopResult.getLocation() == null)
                continue;

            shop.setName(shopResult.getLocation().getName());

            if (shopResult.getLocation().getFacilities() != null) {
                shop.setFacilities(shopResult.getLocation().getFacilities()
                    .stream()
                    .map(ShopSearchResponse.Result.Location.Facility::getDescription)
                    .collect(Collectors.toList()));
            }
            if (shopResult.getLocation().getGeo() != null && shopResult.getLocation().getGeo().getCoordinates() != null) {
                var coordinates = shopResult.getLocation().getGeo().getCoordinates();

                var location = new GetNearbyShopsResponseShop.Location();
                location.setLongitude(coordinates.getLongitude());
                location.setLatitude(coordinates.getLatitude());

                shop.setLocation(location);
            }
            if (shopResult.getDistanceFrom() != null) {
                var distanceFrom = shopResult.getDistanceFrom();

                var distance = new GetNearbyShopsResponseShop.Distance();
                distance.setUnit(distanceFrom.getUnit());
                distance.setValue(distanceFrom.getValue());

                shop.setDistance(distance);
            }
            if (shopResult.getLocation().getOpeningHours() != null
                && shopResult.getLocation().getOpeningHours().get(0) != null
                && shopResult.getLocation().getOpeningHours().get(0).getStandardOpeningHours() != null) {

                var standardOpeningHours = shopResult.getLocation().getOpeningHours().get(0).getStandardOpeningHours();

                var openingHours = new GetNearbyShopsResponseShop.OpeningHour();

                var mondayHours = new GetNearbyShopsResponseShop.OpeningHour.Hours();
                mondayHours.setOpen(standardOpeningHours.getMo().getOpen());
                mondayHours.setClose(standardOpeningHours.getMo().getClose());
                mondayHours.setIsOpen(standardOpeningHours.getMo().getIsOpen());

                var tuesdayHours = new GetNearbyShopsResponseShop.OpeningHour.Hours();
                tuesdayHours.setOpen(standardOpeningHours.getTu().getOpen());
                tuesdayHours.setClose(standardOpeningHours.getTu().getClose());
                tuesdayHours.setIsOpen(standardOpeningHours.getTu().getIsOpen());

                var wednesdayHours = new GetNearbyShopsResponseShop.OpeningHour.Hours();
                wednesdayHours.setOpen(standardOpeningHours.getWe().getOpen());
                wednesdayHours.setClose(standardOpeningHours.getWe().getClose());
                wednesdayHours.setIsOpen(standardOpeningHours.getWe().getIsOpen());

                var thursdayHours = new GetNearbyShopsResponseShop.OpeningHour.Hours();
                thursdayHours.setOpen(standardOpeningHours.getTh().getOpen());
                thursdayHours.setClose(standardOpeningHours.getTh().getClose());
                thursdayHours.setIsOpen(standardOpeningHours.getTh().getIsOpen());

                var fridayHours = new GetNearbyShopsResponseShop.OpeningHour.Hours();
                fridayHours.setOpen(standardOpeningHours.getFr().getOpen());
                fridayHours.setClose(standardOpeningHours.getFr().getClose());
                fridayHours.setIsOpen(standardOpeningHours.getFr().getIsOpen());

                var saturdayHours = new GetNearbyShopsResponseShop.OpeningHour.Hours();
                saturdayHours.setOpen(standardOpeningHours.getSa().getOpen());
                saturdayHours.setClose(standardOpeningHours.getSa().getClose());
                saturdayHours.setIsOpen(standardOpeningHours.getSa().getIsOpen());

                var sundayHours = new GetNearbyShopsResponseShop.OpeningHour.Hours();
                sundayHours.setOpen(standardOpeningHours.getSu().getOpen());
                sundayHours.setClose(standardOpeningHours.getSu().getClose());
                sundayHours.setIsOpen(standardOpeningHours.getSu().getIsOpen());

                openingHours.setMo(mondayHours);
                openingHours.setTu(tuesdayHours);
                openingHours.setWe(wednesdayHours);
                openingHours.setTh(thursdayHours);
                openingHours.setFr(fridayHours);
                openingHours.setSa(saturdayHours);
                openingHours.setSu(sundayHours);

                shop.setOpeningHour(openingHours);
            }

            shops.add(shop);
        }

        return Result.from(shops);
    }

    public TescoProduct productData(final String productId) {
        var productData = this.productDataList(Collections.singletonList(productId));
        if (productData == null)
            return null;

        return productData.get(0);
    }

    public List<TescoProduct> productDataList(final List<String> productIds) {
        var response = this.tescoApiClient.productData(productIds).getBody();
        if (response == null)
            return null;

        for (var product : response) {
            if (product.getIngredients() != null && product.getGuidelineDailyAmounts() != null)
                continue;

            this.missingProductDataService.populate(product);
        }

        return response;
    }
}
