package com.rishav.Chatty.repo;

import com.rishav.Chatty.model.CachedUser;
import org.springframework.data.repository.CrudRepository;

public interface CachedUserRepo extends CrudRepository<CachedUser, String> {

}
