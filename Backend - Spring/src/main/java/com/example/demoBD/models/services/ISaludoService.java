package com.example.demoBD.models.services;


import com.example.demoBD.models.entity.Saludo;

import java.util.List;

public interface ISaludoService {
    public List<Saludo> findAll();

    public Saludo findById(Long id);

    public Saludo save (Saludo saludo);

    public void delete (Long id);
}
