package cn.school.buy.po;

import java.util.List;

public class User {
    private String userid;

    private String username;

    private String password;

    private String address;
    //将电话号码变成String类型
    private String tel;

    private String headPath;
    //一个用户对应多个商品
   /* private List<Product> products;

    public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}*/                        
    public String getUserid() {
        return userid;
    }
    
    public void setUserid(String userid) {
        this.userid = userid == null ? null : userid.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }


    public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getHeadPath() {
        return headPath;
    }

    public void setHeadPath(String headPath) {
        this.headPath = headPath == null ? null : headPath.trim();
    }
}