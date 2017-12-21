package cn.school.buy.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import cn.school.buy.po.Product;
import cn.school.buy.po.User;
import cn.school.buy.service.ProductService;
import cn.school.buy.util.GetCurrentTime;

/**
 * 
 * @ClassName: ProductController.java
 * @Description: 商品的controller
 * 
 * @author xujiacheng
 * @version V1.0
 * @Date 2017年3月11日 下午7:43:37
 */
@Controller
@RequestMapping("/webapp/product")
public class ProductController {  
	
	@Autowired
	private ProductService productService;
	
	@RequestMapping("/queryProducts")
	public String queryProducts(Model model) {
		//查询所有的商品
		List<Product> allProduct = productService.selectAllProduct();  
		model.addAttribute("allProduct", allProduct);
		return "queryItems.html";    
	}
	
	@RequestMapping("/queryProducts2")
	public String queryProducts2(Model model) {
		//查询所有的商品
//		List<Product> allProduct = productService.selectAllProduct();  
		List<Product> allProduct = productService.findALLProductCascadeUser();     
		model.addAttribute("allProduct", allProduct);
		return "queryProducts.jsp";    
	}
	
	@RequestMapping("/queryProductByType")
	public @ResponseBody List<Product> queryProductByType(@RequestBody Product product) {
		//查询商品按照类别
//		List<Product> products = productService.selectProductByType(product);     
		List<Product> products = productService.findProductByTypeCascadeUser(product);     
		return products;    
	}
	
	@RequestMapping("/queryProductByProductId")
	public @ResponseBody Product queryProductByProductId(@RequestBody Product product) {
		product = productService.findProductByProductId(product);     
		return product;    
	}
	
	// 文件上传的处理
	@RequestMapping("/uploadProduct")
	@ResponseBody      
	public String uploadPic(@RequestParam(value = "file", required = false) MultipartFile pictureFile,
			Product product,HttpSession session) throws Exception {
		
		if (pictureFile != null && pictureFile.getOriginalFilename() != null
				&& pictureFile.getOriginalFilename().length() > 0) {
			// 图片上传成功后，将图片的地址写到数据库
			String filePath = "F:\\upload\\image\\";     
			// 上传文件原始名称
			String originalFilename = pictureFile.getOriginalFilename();
			// 新的图片名称
			String newFileName = UUID.randomUUID() + originalFilename.substring(originalFilename.lastIndexOf("."));
			// 新文件
			File file = new java.io.File(filePath + newFileName);

			// 将内存中的文件写入磁盘
			pictureFile.transferTo(file);                

			// 图片上传成功，将新图片地址写入数据库
			 product.setImgpath(newFileName);
			 //product.setUserId("1");绑定商品的用户对象               
			 User user = (User) session.getAttribute("user");
			 product.setUserId(user.getUserid());   
			 //获取当前的日期
			 product.setUploadtime(GetCurrentTime.getCurrentTime());
			 //保存到数据库
			 productService.saveProduct(product);
		}
		return "ok";     
		//request.getRequestDispatcher("queryProducts2.do").forward(request, response);
		//response.sendRedirect("/schoolbuy/webapp/product/queryProducts2.do");
		//return product;              
	}
	
	@RequestMapping("/queryProductsofUser")
	@ResponseBody
	public List<Product> queryProductsofUser(HttpSession session) {
		User user = (User) session.getAttribute("user");
		//查询用户所有的商品
		List<Product> products = productService.selectProductsofUser(user);
		return products;    
	}
	@RequestMapping("/deleteProductById")    
	@ResponseBody
    public String deleteProductById(@RequestBody String[] params) { 
		for(String productid:params) {
			productService.deleteByProductId(productid);
		}
		return "ok";    
	}
	//更新宝贝
	@RequestMapping("/updateProduct")    
	@ResponseBody
	public String updateProduct(@RequestBody Product product) {    
		productService.updateProductById(product);
		return "ok";    
	}
}
