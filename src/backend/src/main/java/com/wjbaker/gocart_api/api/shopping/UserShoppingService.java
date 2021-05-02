package com.wjbaker.gocart_api.api.shopping;

import com.wjbaker.gocart_api.api.shopping.mapper.GetUserProductsMapper;
import com.wjbaker.gocart_api.api.shopping.type.AddProductToUserRequest;
import com.wjbaker.gocart_api.api.shopping.type.GetUserProductsResponse;
import com.wjbaker.gocart_api.data.entity.UserEntity;
import com.wjbaker.gocart_api.data.entity.UserProductEntity;
import com.wjbaker.gocart_api.data.repository.ProductRepository;
import com.wjbaker.gocart_api.data.repository.ShoppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public final class UserShoppingService {

    private final ShoppingRepository shoppingRepository;
    private final ProductRepository productRepository;

    @Autowired
    public UserShoppingService(final ShoppingRepository shoppingRepository, final ProductRepository productRepository) {
        this.shoppingRepository = shoppingRepository;
        this.productRepository = productRepository;
    }

    public GetUserProductsResponse GetUserProducts(final UserEntity user) {
        var products = this.shoppingRepository.findByUser(user);

        return GetUserProductsMapper.map(products);
    }

    public void AddProductToUser(final UserEntity user, final AddProductToUserRequest request) {
        var product = this.productRepository.findByTpnb(request.getTpnb());
        if (product.isEmpty())
            return;

        var userProduct = new UserProductEntity();
        userProduct.setUser(user);
        userProduct.setProduct(product.get());
        userProduct.setListQuantity(1);
        userProduct.setChecked(false);
        userProduct.setAddCount(1);

        this.shoppingRepository.save(userProduct);
    }
}
