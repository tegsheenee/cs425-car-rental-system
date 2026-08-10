package edu.mum.cs.cs425.studentmgmt;

import edu.mum.cs.cs425.studentmgmt.model.Classroom;
import edu.mum.cs.cs425.studentmgmt.model.Student;
import edu.mum.cs.cs425.studentmgmt.model.Transcript;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.time.LocalDate;

public class StudentMgmtApp {

    public static void main(String[] args) {

        Student student = new Student(
                1L,
                "000-61-0001",
                "Anna",
                "Lynn",
                "Smith",
                3.45,
                LocalDate.of(2019, 5, 24)
        );
        Transcript transcript = new Transcript(
                1L,
                "BS Computer Science"
        );

        Classroom classroom = new Classroom(
                1L,
                "McLaughlin building",
                "M105"
        );

        // connect both objects
        transcript.setStudent(student);
        student.setTranscript(transcript);
        student.setClassroom(classroom);

        saveStudent(student, transcript, classroom);
    }

    public static void saveStudent(Student student, Transcript transcript, Classroom classroom) {

        EntityManagerFactory emf =
                Persistence.createEntityManagerFactory("studentMgmtPU");

        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        em.persist(student);
        em.persist(transcript);
        em.persist(classroom);
        em.getTransaction().commit();

        em.close();
        emf.close();

        System.out.println("Student and Transcript saved successfully.");
    }
}