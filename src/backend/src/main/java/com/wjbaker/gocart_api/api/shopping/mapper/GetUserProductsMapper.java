package com.wjbaker.gocart_api.api.shopping.mapper;

import com.wjbaker.gocart_api.api.shopping.type.GetUserProductsResponse;
import com.wjbaker.gocart_api.data.entity.UserProductEntity;

import java.util.List;
import java.util.stream.Collectors;

public final class GetUserProductsMapper {

    private GetUserProductsMapper() {}

    public static GetUserProductsResponse map(final List<UserProductEntity> entity) {
        var getUserProductsResponse = new GetUserProductsResponse();
        getUserProductsResponse.setProducts(entity.stream()
            .map(GetUserProductsMapper::mapProduct)
            .collect(Collectors.toList()));

        return getUserProductsResponse;
    }

    private static GetUserProductsResponse.Product mapProduct(final UserProductEntity entity) {
        var productEntity = entity.getProduct();

        var product = new GetUserProductsResponse.Product();
        product.setTpnb(productEntity.getTpnb());
        product.setName(productEntity.getName());
        product.setPrice(productEntity.getPrice());
        product.setImageUrl(productEntity.getImageUrl());
        product.setDescription(productEntity.getDescription());
        product.setDepartment(productEntity.getDepartment());
        product.setSuperDepartment(productEntity.getSuperDepartment());

        product.setListQuantity(entity.getListQuantity());
        product.setChecked(entity.isChecked());
        product.setAddCount(entity.getAddCount());

        return product;
    }
}
