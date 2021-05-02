package com.wjbaker.gocart_api.api.shopping;

import com.wjbaker.gocart_api.api.tesco.type.SearchProduct;
import com.wjbaker.gocart_api.data.entity.ExtendedProductEntity;
import com.wjbaker.gocart_api.data.entity.ExtendedProductIngredientEntity;
import com.wjbaker.gocart_api.data.entity.ProductEntity;
import com.wjbaker.gocart_api.data.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public final class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(final ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void saveOrUpdateProduct(final SearchProduct product) {
        var productEntity = this.productRepository.findByTpnb(product.getId());

        if (productEntity.isEmpty())
            this.save(product);
        else
            this.update(product, productEntity.get());
    }

    private void save(final SearchProduct product) {
        var productEntity = new ProductEntity();
        productEntity.setTpnb(product.getId());
        productEntity.setName(product.getName());
        productEntity.setPrice(product.getPrice());
        productEntity.setImageUrl(product.getImageUrl());
        productEntity.setDescription(product.getDescription());
        productEntity.setDepartment(product.getDepartment());
        productEntity.setSuperDepartment(product.getSuperDepartment());

        if (product.getBarcodeId() != null) {
            var extendedProduct = this.createExtendedProductEntityFromTescoProduct(product, productEntity);
            productEntity.setExtendedProduct(extendedProduct);
        }

        this.productRepository.save(productEntity);
    }

    private ExtendedProductEntity createExtendedProductEntityFromTescoProduct(
        final SearchProduct product,
        final ProductEntity productEntity) {

        var extendedProduct = new ExtendedProductEntity();
        extendedProduct.setProduct(productEntity);
        extendedProduct.setBarcodeId(product.getBarcodeId());
        extendedProduct.setHealthScore(product.getHealthScore());

        if (product.getIngredients() != null) {
            extendedProduct.setIngredients(product.getIngredients().stream()
                .map(x -> {
                    var ingredientEntity = new ExtendedProductIngredientEntity();
                    ingredientEntity.setExtendedProduct(extendedProduct);
                    ingredientEntity.setIngredient(x);

                    return ingredientEntity;
                })
                .collect(Collectors.toList()));
        }

        return extendedProduct;
    }

    private void update(final SearchProduct product, final ProductEntity productEntity) {
        productEntity.setName(product.getName());
        productEntity.setPrice(product.getPrice());
        productEntity.setImageUrl(product.getImageUrl());
        productEntity.setDescription(product.getDescription());
        productEntity.setDepartment(product.getDepartment());
        productEntity.setSuperDepartment(product.getSuperDepartment());

        this.productRepository.save(productEntity);
    }
}
