package com.example.demoBD.models.services;

import com.example.demoBD.models.dao.ISaludoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demoBD.models.entity.Saludo;


import java.util.List;

@Service
public class SaludoServiceImpl implements ISaludoService{


    @Autowired
    private ISaludoDao saludoDao;

    @Override
    public List<Saludo> findAll() {
        return (List<Saludo>) saludoDao.findAll();
    }

    @Override
    public Saludo findById(Long id){
        return saludoDao.findById(id).orElse(null);
    }

    @Override
    public Saludo save (Saludo saludo){
        return saludoDao.save(saludo);
    }

    @Override
    public void delete (Long id){
        saludoDao.deleteById(id);
    }
}
