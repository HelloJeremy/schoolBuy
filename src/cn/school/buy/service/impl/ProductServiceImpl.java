package cn.school.buy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cn.school.buy.mapper.ProductMapper;
import cn.school.buy.po.Product;
import cn.school.buy.po.ProductExample;
import cn.school.buy.po.User;
import cn.school.buy.service.ProductService;

public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductMapper productMapper;
	
	@Override
	public int saveProduct(Product product) {
		return productMapper.insert(product);
	}

	@Override
	public List<Product> selectAllProduct() {
		return productMapper.selectALLProduct();
	}

	@Override
	public List<Product> selectProductByType(Product product) {
		ProductExample productExample = new ProductExample();
		productExample.or().andProductTypeEqualTo(product.getProductType());
		productExample.setOrderByClause("uploadtime DESC,productid DESC");    
		return productMapper.selectByExample(productExample);  
	}

	@Override
	public List<Product> findALLProductCascadeUser() {
		return productMapper.findALLProductCascadeUser();
	}

	@Override
	public List<Product> findProductByTypeCascadeUser(Product product) {
		return productMapper.findProductOfTypeCascadeUser(product);
	}

	@Override
	public Product findProductByProductId(Product product) {
		return productMapper.findProductByProductId(product);   
	}

	@Override
	public List<Product> selectProductsofUser(User user) {
		ProductExample productExample = new ProductExample();
		productExample.or().andUserIdEqualTo(user.getUserid());
		productExample.setOrderByClause("uploadtime DESC,productid DESC"); 
		return productMapper.selectByExample(productExample);   
	}

	@Override
	public int deleteByProductId(String productid) {
		return productMapper.deleteByPrimaryKey(productid);   
	}

	@Override
	public int updateProductById(Product product) {
		return productMapper.updateByPrimaryKey(product);
	}

}
